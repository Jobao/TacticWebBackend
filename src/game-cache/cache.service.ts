import { Injectable } from '@nestjs/common';
import { Game } from 'src/game/schemas/game.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class CacheService {
    constructor(private mongoService:MongodbService){
        this.gameCache = new Map<string, Game>();
        this.userCache = new Map<string, User>();
    }
    
    gameCache: Map<string, Game>;

    async gameInCache(game_uuid:string): Promise<Game>{
        let temp = this.gameCache.get(game_uuid);
        if(!temp){
            let gameBD = await this.mongoService.findGame(game_uuid);
            if(gameBD){
                this.setGameInCache(gameBD);
                temp = gameBD;
            }
        }
        
        return temp;
    }
    /**
     * Actualiza o agrega un nuevo juego en cache
     * @param nGame 
     */
    setGameInCache(nGame:Game){
        this.gameCache.set(nGame._id, nGame);
    }

    removeGameInCache(game_uuid:string){
        this.gameCache.delete(game_uuid);
    }

    userCache: Map<string, User>;

    /**
     * Si el usuario no esta en cache, lo busca en la BD
     * @param user_uuid 
     * @returns 
     */
    async userInCache(user_uuid:string): Promise<User>{
        let temp = this.userCache.get(user_uuid);
        if(!temp){
            let userBD = await this.mongoService.findUser(user_uuid);
            if(userBD){
                this.setUserInCache(userBD);
                temp = userBD;
            }
        }
        
        return  temp; 
    }

    setUserInCache(nUser: User){
        this.userCache.set(nUser._id, nUser);
    }
}
