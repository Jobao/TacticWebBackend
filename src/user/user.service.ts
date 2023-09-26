import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}

    async create(cUser:CreateUserDto){
        cUser._id = uuidv4();
        
        await this.userModel.create(cUser);
        
    }

    async findAll(){//TODO: Esto deberia devolver un DTO

        console.log( await this.userModel.find().exec())
        
    }

    async findOne(uuid:string){
        let tt:GetUserDto = new GetUserDto();
        await this.userModel.findOne({_id: uuid}).exec().then((t) =>{
            tt.user = t.user
            tt._id = t._id;
        });
        return tt;
    }

}
