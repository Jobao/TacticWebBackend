import { Piece } from "./piece.schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SlotDocument = Slot & Document;

@Schema({_id: false})
export class Slot{
    @Prop()
    enabled:boolean;
    
    @Prop(Piece)
    piece?:Piece;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);