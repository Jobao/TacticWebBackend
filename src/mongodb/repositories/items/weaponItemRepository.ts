import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeaponItem, WeaponItemDocument } from 'src/item/schemas/weaponItem.schema';
import { BaseMongoRepository } from '../baseMongoRepository';
import { EquipmentSlot } from 'src/game/schemas/enums';

@Injectable()
export class WeaponItemRepository extends BaseMongoRepository<WeaponItem> {
  constructor(@InjectModel(WeaponItem.name) private entity: Model<WeaponItemDocument>) {
    super(entity);
  }

  async getAllItemBySlot(slot: EquipmentSlot) {
    return await this.entity.find({ slot: slot });
  }
}
