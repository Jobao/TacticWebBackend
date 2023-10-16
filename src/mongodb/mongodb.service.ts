import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassSkill, ClassSkillDocument } from 'src/game/schemas/classSkill.schema';
import { UnitClass, UnitClassDocument } from 'src/game/schemas/unitClass.schema';
import { GameMongoRepository } from './repositories/gameMongoModel';
import { UserMongoRepository } from './repositories/userMongoModel';
import { UnitClassMongoRepository } from './repositories/unitClassMongoModel';
import { AuthMongoRepository } from './repositories/authMongoRepository';

@Injectable()
export class MongodbService {
    constructor(@InjectModel(ClassSkill.name) private classSkillModel:Model<ClassSkillDocument>,
    readonly gameRepository:GameMongoRepository,
    readonly userRepository:UserMongoRepository,
    readonly unitClassRepository:UnitClassMongoRepository,
    readonly authMongoRepository:AuthMongoRepository){
        
    }

    //-------------------------SKILLS---------------SKILLS-------------------SKILLS---------
    
    async createSkill(nSkill:ClassSkill){
        await this.classSkillModel.create(nSkill);
    }

}
