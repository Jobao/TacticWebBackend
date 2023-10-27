import { Injectable } from '@nestjs/common';
import { GameMongoRepository } from './repositories/gameMongoRepository';
import { UserMongoRepository } from './repositories/userMongoRepository';
import { UnitClassMongoRepository } from './repositories/unitClassMongoRepository';
import { AuthMongoRepository } from './repositories/authMongoRepository';
import { ClassSkillMongoRepository } from './repositories/classSkillRepository';
import { UsableItemRepository } from './repositories/items/usableItemRepository';
import { EquipableItemRepository } from './repositories/items/equipableItemRepository';
import { WeaponItemRepository } from './repositories/items/weaponItemRepository';

@Injectable()
export class MongodbService {
    constructor(readonly gameRepository:GameMongoRepository,
    readonly userRepository:UserMongoRepository,
    readonly unitClassRepository:UnitClassMongoRepository,
    readonly authRepository:AuthMongoRepository,
    readonly classSkillRepository:ClassSkillMongoRepository,
    readonly usableItemRepository:UsableItemRepository,
    readonly equipableItemRepository:EquipableItemRepository,
    readonly weaponItemRepository:WeaponItemRepository){
        
    }
}
