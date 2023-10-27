import { Injectable } from "@nestjs/common";
import { BaseMongoRepository } from "../baseMongoRepository";
import { UsableItem, UsableItemDocument } from "src/item/schemas/usableItem.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsableItemRepository extends BaseMongoRepository<UsableItem>{
    constructor(@InjectModel(UsableItem.name) private entity: Model<UsableItemDocument>) {
        super(entity);
      }
}