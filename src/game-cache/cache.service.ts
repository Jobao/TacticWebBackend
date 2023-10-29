import { Injectable } from '@nestjs/common';
import { Game } from 'src/game/schemas/game.schema';
import { UnitClass } from 'src/unit-clases/schema/unitClass.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { User } from 'src/user/user.schema';
import { BaseCache } from './baseCache';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'src/item/schemas/item.schema';
import { UsableItem } from 'src/item/schemas/usableItem.schema';
import { EquipableItem } from 'src/item/schemas/equipableItem.schema';
import { WeaponItem } from 'src/item/schemas/weaponItem.schema';
import { mongo } from 'mongoose';

@Injectable()
export class CacheService {
    constructor(private mongoService:MongodbService){

        this.unitClassCache = new BaseCache<UnitClass>(mongoService.unitClassRepository);
        this.gameCache = new BaseCache<Game>(mongoService.gameRepository);
        this.userCache = new BaseCache<User>(mongoService.userRepository);
        this.usableItemCache = new BaseCache<UsableItem>(mongoService.usableItemRepository)
        this.equipableItemCache = new BaseCache<EquipableItem>(mongoService.equipableItemRepository);
        this.weaponItemCache = new BaseCache<WeaponItem>(mongoService.weaponItemRepository);
        
    }
    private gameCache: BaseCache<Game>;
    
    public get GameCache() : BaseCache<Game> {
        return this.gameCache;
    }
    
//-------------------------------User-----------------------------User
    private userCache:BaseCache<User>;

    public get UserCache(): BaseCache<User>{
        return this.userCache;
    }
    //---------------------UnitClass---------------UnitClass-----------

    private unitClassCache:BaseCache<UnitClass>;

    public get UnitClassCache(): BaseCache<UnitClass>{
        return this.unitClassCache;
    }
//---------------------------ITEMS-------------------------------------------
    private usableItemCache:BaseCache<UsableItem>;

    public get UsableItemCache(): BaseCache<UsableItem>{
        return this.usableItemCache;
    }

    private equipableItemCache:BaseCache<EquipableItem>;

    public get EquipableItemCache(): BaseCache<EquipableItem>{
        return this.equipableItemCache;
    }

    private weaponItemCache:BaseCache<WeaponItem>;

    public get WeaponItemCache(): BaseCache<WeaponItem>{
        return this.weaponItemCache;
    }
}
