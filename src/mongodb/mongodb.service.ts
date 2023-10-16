import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassSkill, ClassSkillDocument } from 'src/game/schemas/classSkill.schema';
import { UnitClass, UnitClassDocument } from 'src/game/schemas/unitClass.schema';
import { GameMongoRepository } from './repositories/gameMongoModel';
import { UserMongoRepository } from './repositories/userMongoModel';
import { UnitClassMongoRepository } from './repositories/unitClassMongoModel';
import { AuthMongoRepository } from './repositories/authMongoRepository';
import { ClassSkillMongoRepository } from './repositories/classSkillRepository';

@Injectable()
export class MongodbService {
    constructor(readonly gameRepository:GameMongoRepository,
    readonly userRepository:UserMongoRepository,
    readonly unitClassRepository:UnitClassMongoRepository,
    readonly authRepository:AuthMongoRepository,
    readonly classSkillRepository:ClassSkillMongoRepository){
        
    }
}
