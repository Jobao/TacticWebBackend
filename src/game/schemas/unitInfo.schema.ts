import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Unit } from './unit.schema';

export type UnitInfoDocument = UnitInfo & Document;

@Schema({_id: false})
export class UnitInfo{

    @Prop(Unit)
    unitBase:Unit;

    @Prop()
    posX: number;

    @Prop()
    posY: number;
}

export const UnitInfoSchema = SchemaFactory.createForClass(UnitInfo);