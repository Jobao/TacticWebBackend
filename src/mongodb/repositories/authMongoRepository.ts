import { BaseMongoRepository } from "./baseMongoModel";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Auth, AuthDocument } from "src/auth/auth.schema";

@Injectable()
export class AuthMongoRepository extends BaseMongoRepository<Auth>{
    constructor(@InjectModel(Auth.name) private entity: Model<AuthDocument>) {
        super(entity);
      }
}