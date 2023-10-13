import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    @Prop()
    classExperience:{classId:string, amount:number}[]

    
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.loadClass(Unit);