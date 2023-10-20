import { BaseMongoRepository } from "./baseMongoRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { ClassSkill, ClassSkillDocument } from "src/skills/schema/classSkill.schema";

@Injectable()
export class ClassSkillMongoRepository extends BaseMongoRepository<ClassSkill>{
    constructor(@InjectModel(ClassSkill.name) private entity: Model<ClassSkillDocument>) {
        super(entity);
      }
}