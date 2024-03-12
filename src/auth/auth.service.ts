import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Auth } from './auth.schema';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { SignupDto } from './dto/signup.dto';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { Request } from '@nestjs/common';
import { CustomResponseType, FailsStrings, ILoginResponse } from 'src/response/responseType';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mongoService: MongodbService,
  ) {}

  async login(payload: LoginDto) {
    let res: CustomResponseType<ILoginResponse> = new CustomResponseType<ILoginResponse>();

    let user = await this.mongoService.authRepository.findOne(payload.user);

    if (user) {
      if (await user.checkPassword(payload.pass)) {
        const paylo = { sub: user.uuid, username: user._id };
        const response: ILoginResponse = {
          access_token: 'Bearer ' + (await this.jwtService.signAsync(paylo)),
          user_uuid: user.uuid,
        };
        res.setOK(response);
      } else {
        res.setFAIL(FailsStrings.INVALID_PASSWORD);
      }
    } else {
      res.setFAIL(FailsStrings.INEXISTENT_USER);
    }

    return res;
  }

  async signup(payload: SignupDto) {
    let uuid = uuidv4();
    let auth = new Auth();
    auth._id = payload.user;
    auth.pass = payload.pass;
    auth.uuid = uuid;
    let response: CustomResponseType<User> = new CustomResponseType<User>();

    try {
      const createdAuth = await this.mongoService.authRepository.create(auth);
      if (createdAuth) {
        const createdUser = await this.userService.create({
          _id: uuid,
          user: payload.user,
          displayName: payload.displayName,
        });
        if (createdUser) {
          response.setOK(createdUser);
        } else {
          response.setFAIL(FailsStrings.CANT_CREATE_USER);
        }
      } else {
        response.setFAIL(FailsStrings.CANT_CREATE_AUTH);
      }
      return response;
    } catch (error) {
      response.setFAIL(FailsStrings.DUPLICATE_USER);

      return response;
    }
  }
}
