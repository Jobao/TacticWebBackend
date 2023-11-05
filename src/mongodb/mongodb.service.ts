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

    async DONT_USE_DELETE_ALL_DOCUMENT_ON_MONGO(){
        await this.gameRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();
        await this.userRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();
        //await this.unitClassRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();
        await this.authRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();
        //await this.classSkillRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();
        //await this.usableItemRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();
        //await this.equipableItemRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();
        //await this.weaponItemRepository.CLEAN_ALL_COLLECTION_ATTENTION_010101010();

    }
}
