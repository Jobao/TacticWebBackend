import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { Unit } from 'src/game/schemas/unit.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}

    async create(cUser:CreateUserDto){
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

    async addNewUnit(cUnity: CreateUnitDto){
        cUnity.uuid = uuidv4();
        let usr = await this.userModel.findById(cUnity.client_uuid);
        if(usr){
            usr.createdUnits.push({_id: cUnity.uuid, name: cUnity.name, class: cUnity.class})
            this.userModel.findByIdAndUpdate(cUnity.client_uuid, usr).exec();
        }
        
    }

}
