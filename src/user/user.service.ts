import { Injectable } from '@nestjs/common';
import { User} from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { CacheService } from 'src/game-cache/cache.service';
import { Unit } from 'src/game/schemas/unit.schema';
import { UnitClasesService } from 'src/unit-clases/unit-clases.service';

@Injectable()
export class UserService {
    constructor(private mongoService:MongodbService,
    private cacheService:CacheService, private unitClassService:UnitClasesService){}
    /**
     * NO llamar directamente de los controllers/gateway
     * Llamar auth.Create
     */
    async create(cUser:CreateUserDto){
        let user = new User();
        user._id = cUser._id;
        user.user = cUser.user;
        user.displayName = cUser.displayName;
        await this.mongoService.userRepository.create(user);
        
    }

    async findAll(){

        return await this.mongoService.userRepository.findAll();
        
    }

    async findOne(user_uuid:string){
        return await this.mongoService.userRepository.findOne(user_uuid);
    }

    async update(uUser:User){
        return await this.mongoService.userRepository.update(uUser._id,uUser)
    }

    async addNewUnit(cUnity: CreateUnitDto){
        let usr = await this.cacheService.UserCache.getInCacheOrBD(cUnity.user_uuid);
        if(usr){
            let unit = new Unit();
            unit.classExperience=[];
            let uClass = this.unitClassService.canUseThisClass(cUnity.class_id, unit);
            if(uClass){
                unit._id = uuidv4();
                unit.name = cUnity.name;
                unit.changeClass(uClass);
                usr.createdUnits.push(unit);
                await this.cacheService.UserCache.setInCache(usr._id,await this.update(usr));
            }
            else{
                console.log("CANT")
            }
            
            
        }
    }
}
