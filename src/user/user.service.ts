import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}

    async create(cUser:CreateUserDto){
        await this.userModel.create(cUser);
        
    }

    async findAll(){//TODO: Esto deberia devolver un DTO

        console.log( await this.userModel.find().exec())
        
    }

}
