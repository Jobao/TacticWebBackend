import { BaseMongoRepository } from "./baseMongoRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UnitClass, UnitClassDocument } from "src/unit-clases/schema/unitClass.schema";

@Injectable()
export class UnitClassMongoRepository extends BaseMongoRepository<UnitClass>{
    constructor(@InjectModel(UnitClass.name) private entity: Model<UnitClassDocument>) {
        super(entity);
      }

      async getAllNameClass(){
        return await this.entity.find().select("_id").exec();;
      }
}