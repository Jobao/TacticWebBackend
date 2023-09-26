import { Slot } from "./slot.schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BoardDocument = Board & Document;

@Schema({_id: false})
export class Board{
    @Prop([Slot])
    slots: Slot[];
    @Prop()
    cantSlots:number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);