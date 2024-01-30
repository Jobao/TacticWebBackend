import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ discriminatorKey: 'itemType' })
export class Item {
  @Prop()
  _id: string;
  @Prop()
  description: string;
  @Prop()
  name: string;

  /*@Prop({enum:[]})
    itemType:string*/
}

export const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.plugin(require('mongoose-autopopulate'));
ItemSchema.loadClass(Item);
