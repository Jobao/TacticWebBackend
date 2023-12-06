import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Auth} from './auth.schema';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { SignupDto } from './dto/signup.dto';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService:UserService,private mongoService:MongodbService) {}

    async login(payload: LoginDto){
        let r= await this.mongoService.authRepository.findOne(payload.user);
        
        if(r){
            if(await r.checkPassword(payload.pass)){
                
                const paylo = { sub: r.uuid, username: r._id };
                return {
                            access_token:  "Bearer " + await this.jwtService.signAsync(paylo),
                    };
            }
            else{
                return {status:"error"}
            }
        }
        return {status:"error"}
    }

    async signup(payload: SignupDto){
        let uuid = uuidv4();
        let auth = new Auth();
        auth._id = payload.user;
        auth.pass = payload.pass;
        auth.uuid = uuid;

        try {
            await this.mongoService.authRepository.create(auth)
            return await this.userService.create({_id: uuid, user: payload.user, displayName: payload.displayName})
        } catch (error) {
            console.log(error);
            
        }
    }
}
