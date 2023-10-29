import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EquipableItem, EquipableItemDocument } from "src/item/schemas/equipableItem.schema";
import { BaseMongoRepository } from "../baseMongoRepository";
import { EquipmentSlot } from "src/game/schemas/enums";

@Injectable()
export class EquipableItemRepository extends BaseMongoRepository<EquipableItem>{
    constructor(@InjectModel(EquipableItem.name) private entity: Model<EquipableItemDocument>) {
        super(entity);
      }

      async getAllItemBySlot(slot:EquipmentSlot){
        return await this.entity.find({slot: slot});
      }
}