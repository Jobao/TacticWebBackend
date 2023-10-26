import { Schema, SchemaFactory } from "@nestjs/mongoose";

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    
}

export const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.plugin(require('mongoose-autopopulate'));
ItemSchema.loadClass(Item);
