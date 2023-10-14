import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TupleRequiredClass } from './requiredClass.schema';
import { TupleStats } from './stats.schema';

export type UnitDocument = Unit & Document;

@Schema()
export class Unit{
    @Prop()
    _id:string;

    @Prop()
    name:string;

    @Prop()
    currentClassId:string;

    @Prop()
    HP:number;

    @Prop()
    MP:number;

    @Prop()
    battleActions:string;

    @Prop([TupleRequiredClass])
    classExperience:TupleRequiredClass[]

    @Prop([TupleStats])
    stats:TupleStats[];
    
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.loadClass(Unit);