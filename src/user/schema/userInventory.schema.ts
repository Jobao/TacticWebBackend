import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TupleInventory, TupleInventorySchema } from './tupleInventory.schema';

export type UserInventoryDocument = UserInventory & Document;

@Schema({ id: false, _id: false })
export default class UserInventory {
  constructor() {
    this.equipableInventory = [];
    this.weaponInventory = [];
  }
  @Prop({ type: () => [TupleInventorySchema], autopopulate: true })
  equipableInventory: TupleInventory[];

  @Prop({ type: [TupleInventorySchema], autopopulate: true })
  weaponInventory: TupleInventory[];
}

export const UserInventorySchema = SchemaFactory.createForClass(UserInventory);
UserInventorySchema.loadClass(UserInventory);
