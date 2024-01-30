import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserInventoryDocument = UserInventory & Document;

@Schema({ id: false })
export default class UserInventory {
  @Prop({ type: [{ amount: Number, item_id: String }] })
  equipableInventory: [{ amount: number; item_id: string }];

  @Prop({ type: [{ amount: Number, item_id: String }] })
  weaponInventory: [{ amount: number; item_id: string }];
}

export const UserInventorySchema = SchemaFactory.createForClass(UserInventory);
UserInventorySchema.loadClass(UserInventory);
