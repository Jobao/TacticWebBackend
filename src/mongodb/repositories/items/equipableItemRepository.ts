import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EquipableItem, EquipableItemDocument } from "src/item/schemas/equipableItem.schema";
import { BaseMongoRepository } from "../baseMongoRepository";

@Injectable()
export class EquipableItemRepository extends BaseMongoRepository<EquipableItem>{
    constructor(@InjectModel(EquipableItem.name) private entity: Model<EquipableItemDocument>) {
        super(entity);
      }
}