import { Injectable } from '@nestjs/common';
import { Game, GameDocument } from './schemas/game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/createGame.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameService {
    constructor(@InjectModel(Game.name) private gameModel:Model<GameDocument>){}

    async createGame(cGame:CreateGameDto){
        cGame._id = uuidv4();
        await this.gameModel.create(cGame);
    }
}
