import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Auth, AuthDocument } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService:UserService,
        @InjectModel(Auth.name) private authModel:Model<AuthDocument>) {}

    async login(payload: LoginDto){
        let r= await this.authModel.findById(payload.user);
        if(r){
            if(r.pass === payload.pass){
                console.log("Perfect >D");
                
                const paylo = { sub: r.uuid, username: r._id };
                return {
                            access_token: await this.jwtService.signAsync(paylo),
                    };
            }
        }
    }

    async signup(payload: LoginDto){
        this.authModel.create({_id: payload.user, pass: payload.pass, uuid: uuidv4()})

    }
}
