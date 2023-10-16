import { BaseMongoRepository } from "./baseMongoModel";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { ClassSkill, ClassSkillDocument } from "src/game/schemas/classSkill.schema";

@Injectable()
export class ClassSkillMongoRepository extends BaseMongoRepository<ClassSkill>{
    constructor(@InjectModel(ClassSkill.name) private entity: Model<ClassSkillDocument>) {
        super(entity);
      }
}