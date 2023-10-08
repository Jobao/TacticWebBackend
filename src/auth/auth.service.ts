import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Auth, AuthDocument } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { SignupDto } from './dto/signup.dto';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService:UserService,private mongoService:MongodbService,
        @InjectModel(Auth.name) private authModel:Model<AuthDocument>) {}

    async login(payload: LoginDto){
        //let t = this.mongoService.
        let r= await this.mongoService.findAuth(payload.user);
        if(r){
            if(r.checkPassword(payload.pass)){
                
                const paylo = { sub: r.uuid, username: r._id };
                return {
                            access_token:  "Bearer " + await this.jwtService.signAsync(paylo),
                    };
            }
        }
    }

    async signup(payload: SignupDto){
        let uuid = uuidv4();
        let auth = new Auth();
        auth._id = payload.user;
        auth.pass = payload.pass;
        auth.uuid = uuid;
        this.mongoService.createAuth(auth);
        //this.authModel.create({_id: payload.user, pass: payload.pass, uuid: uuid})
        this.userService.create({_id: uuid, user: payload.user, displayName: payload.displayName})

    }
}
