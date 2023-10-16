import { BaseMongoRepository } from "./baseMongoModel";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UnitClass, UnitClassDocument } from "src/game/schemas/unitClass.schema";

@Injectable()
export class UnitClassMongoRepository extends BaseMongoRepository<UnitClass>{
    constructor(@InjectModel(UnitClass.name) private entity: Model<UnitClassDocument>) {
        super(entity);
      }
}