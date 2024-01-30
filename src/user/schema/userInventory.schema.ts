import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserInventoryDocument = UserInventory & Document;

export type TupleInventory = {
  amount: number;
  item_id: string;
};

@Schema({ id: false, _id: false })
export default class UserInventory {
  constructor() {
    this.equipableInventory = [];
    this.weaponInventory = [];
  }
  @Prop({ type: [{ amount: Number, item_id: String }] })
  equipableInventory: TupleInventory[];

  @Prop({ type: [{ amount: Number, item_id: String }] })
  weaponInventory: TupleInventory[];
}

export const UserInventorySchema = SchemaFactory.createForClass(UserInventory);
UserInventorySchema.loadClass(UserInventory);
