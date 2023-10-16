import { Injectable } from '@nestjs/common';
import { User} from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { CacheService } from 'src/game-cache/cache.service';

@Injectable()
export class UserService {
    constructor(private mongoService:MongodbService,
    private cacheService:CacheService){}
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
        this.cacheService.UserCache.setInCache(uUser._id, await this.mongoService.userRepository.update(uUser._id,uUser));
        
        return this.cacheService.UserCache.getInCacheOrBD(uUser._id);
    }

    async addNewUnit(cUnity: CreateUnitDto){
        cUnity._id = uuidv4();
        let usr = await this.cacheService.UserCache.getInCacheOrBD(cUnity.user_uuid);
        if(usr){
            usr.createdUnits.push(cUnity)
            await this.update(usr);
            
        }
    }
}
