import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EffectSchema, Effect } from 'src/game/schemas/effect.schema';
import { Item } from './item.schema';
import { EquipableItem } from './equipableItem.schema';
import { WeaponType } from 'src/game/schemas/enums';

export type WeaponItemDocument = WeaponItem & Document;

@Schema()
export class WeaponItem extends EquipableItem {
  @Prop()
  range: number;

  @Prop()
  weaponType: WeaponType;
}

export const WeaponItemSchema = SchemaFactory.createForClass(WeaponItem);
WeaponItemSchema.loadClass(WeaponItem);
