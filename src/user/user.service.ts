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
        await this.mongoService.createUser(user);
        //await this.userModel.create(cUser);
        
    }

    async findAll(){//TODO: Esto deberia devolver un DTO

        return await this.mongoService.getAllUsers();
        
    }

    async findOne(user_uuid:string){
        return await this.mongoService.findUser(user_uuid);
        //return await this.userModel.findOne({_id: user_uuid}).exec();
    }

    async update(uUser:User){
        this.cacheService.setUserInCache(await this.mongoService.updateUser(uUser));
        return this.cacheService.userInCache(uUser._id);
    }

    async addNewUnit(cUnity: CreateUnitDto){
        cUnity._id = uuidv4();
        let usr = await this.cacheService.userInCache(cUnity.client_uuid);
        if(usr){
            usr.createdUnits.push(cUnity)
            await this.update(usr);
            
        }
    }
}
