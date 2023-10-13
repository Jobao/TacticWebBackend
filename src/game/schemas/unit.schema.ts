import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RequiredClass } from './requiredClass.schema';
import { Stats } from './stats.schema';

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
    @Prop([RequiredClass])
    classExperience:RequiredClass[]

    @Prop([Stats])
    stats:Stats[];


    
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.loadClass(Unit);