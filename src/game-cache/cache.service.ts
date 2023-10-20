import { Injectable } from '@nestjs/common';
import { Game } from 'src/game/schemas/game.schema';
import { UnitClass } from 'src/unit-clases/schema/unitClass.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { User } from 'src/user/user.schema';
import { BaseCache } from './baseCache';

@Injectable()
export class CacheService {
    constructor(private mongoService:MongodbService){

        this.unitClassCache = new BaseCache<UnitClass>(mongoService.unitClassRepository);
        this.gameCache = new BaseCache<Game>(mongoService.gameRepository);
        this.userCache = new BaseCache<User>(mongoService.userRepository);

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
}
