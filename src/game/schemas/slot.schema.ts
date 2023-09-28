import { PlacedUnit } from "./placedUnits.schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SlotDocument = Slot & Document;

@Schema({_id: false})
export class Slot{
    @Prop()
    enabled:boolean;
    
    @Prop(PlacedUnit)
    piece?:PlacedUnit;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);