import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from 'src/game/schemas/game.schema';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class MongodbService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>){}

    async createGame(nGame:Game){
        return await this.gameModel.create(nGame);
    }

    async findGame(game_uuid:string){
        return await this.gameModel.findById(game_uuid).exec();
    }

    async updateGame(uGame:Game){
        return await this.gameModel.findByIdAndUpdate(uGame._id, uGame).exec();
    }

    async removeGame(game:Game){
        return await this.gameModel.findByIdAndRemove(game._id).exec();
    }

    /*------------------------USER------USER------USER--------------------------------*/


    async findUser(user_uuid:string){
        return await this.userModel.findById(user_uuid).exec();
    }
}
