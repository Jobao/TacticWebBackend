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
    /**
     * NO llamar directamente de los controllers/gateway
     * Llamar auth.Create
     */
    async create(cUser:CreateUserDto){
        await this.userModel.create(cUser);
        
    }

    async findAll(){//TODO: Esto deberia devolver un DTO

        return await this.userModel.find().exec();
        
    }

    async findOne(uuid:string){
        return await this.userModel.findOne({_id: uuid}).exec();
    }

    async addNewUnit(cUnity: CreateUnitDto){
        cUnity._id = uuidv4();
        let usr = await this.userModel.findById(cUnity.client_uuid);
        if(usr){
            //usr.createdUnits.push({_id: cUnity.uuid, name: cUnity.name, class_id: cUnity.class_id})
            usr.createdUnits.push(cUnity)
            this.userModel.findByIdAndUpdate(cUnity.client_uuid, usr).exec();
        }
        
    }

    async isMyUnit(user_uuid:string, unit_uuid){
        let isMy:boolean = false;
        let unit:Unit;
        await this.userModel.findOne({_id: user_uuid}).exec().then((usr)=>{
            usr.createdUnits.forEach((element) =>{
                if(element._id === unit_uuid){
                    isMy = true
                    unit = element;
                }
            });
        });

        return {isMy, unit};
    }

}
