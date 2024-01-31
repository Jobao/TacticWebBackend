import { BaseMongoRepository } from './baseMongoRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class UserMongoRepository extends BaseMongoRepository<User> {
  constructor(@InjectModel(User.name) private entity: Model<UserDocument>) {
    super(entity);
  }
}
