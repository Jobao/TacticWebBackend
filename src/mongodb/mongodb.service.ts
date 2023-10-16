import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from 'src/auth/auth.schema';
import { ClassSkill, ClassSkillDocument } from 'src/game/schemas/classSkill.schema';
import { Game, GameDocument } from 'src/game/schemas/game.schema';
import { UnitClass, UnitClassDocument } from 'src/game/schemas/unitClass.schema';
import { User, UserDocument } from 'src/user/user.schema';
import { GameMongoRepository } from './repositories/gameMongoModel';
import { UserMongoRepository } from './repositories/userMongoModel';
import { UnitClassMongoRepository } from './repositories/unitClassMongoModel';

@Injectable()
export class MongodbService {
    constructor(@InjectModel(Auth.name) private authModel:Model<AuthDocument>,
    @InjectModel(ClassSkill.name) private classSkillModel:Model<ClassSkillDocument>, 
    @InjectModel(UnitClass.name) private unitClassModel:Model<UnitClassDocument>,
    readonly gameRepository:GameMongoRepository,
    readonly userRepository:UserMongoRepository,
    readonly unitClassrepository:UnitClassMongoRepository){
        
    }

    //------------------------AUTH--------------------AUTH----------------AUTH-----

    async findAuth(user:string){
        return await this.authModel.findById(user).exec();
    }

    async createAuth(auth:Auth){
        await this.authModel.create(auth);
    }

    //-------------------------SKILLS---------------SKILLS-------------------SKILLS---------
    
    async createSkill(nSkill:ClassSkill){
        await this.classSkillModel.create(nSkill);
    }

    //------------------------CLASS------------------CLASS-------------------CLASS--------
    async createUnitClass(nclass:UnitClass){
        await this.unitClassModel.create(nclass);
    }

    async getAllClasses(){
        return await this.unitClassModel.find();
    }

    async findClass(classId:string){
        return await this.unitClassModel.findById(classId);
    }

}
