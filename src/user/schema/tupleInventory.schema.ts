import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TupleInventoryDocument = TupleInventory & Document;
@Schema({ id: false, _id: false })
export class TupleInventory {
  @Prop()
  amount: number;
  @Prop()
  item_id: string;
}

export const TupleInventorySchema = SchemaFactory.createForClass(TupleInventory);
TupleInventorySchema.loadClass(TupleInventory);
