import { Game, GameDocument } from "src/game/schemas/game.schema";
import { BaseMongoModel } from "./baseMongoModel";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GameMongoModel extends BaseMongoModel<Game>{
    constructor(@InjectModel(Game.name) private entity: Model<GameDocument>) {
        super(entity);
      }
}