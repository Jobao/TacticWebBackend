import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Unit } from './unit.schema';
import { Document } from 'mongoose';

export type UnitInfoDocument = UnitInfo & Document;

@Schema({_id: false})
export class UnitInfo{

    @Prop()
    unitBase_uuid:string;

    @Prop()
    posX: number;

    @Prop()
    posY: number;

    ocupied(x:number, y:number): boolean{
        return x===this.posX && y === this.posY;
    }
}

export const UnitInfoSchema = SchemaFactory.createForClass(UnitInfo);
UnitInfoSchema.loadClass(UnitInfo);