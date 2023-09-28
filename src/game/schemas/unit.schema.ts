import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UnitDocument = Unit & Document;

@Schema()
export class Unit{
    @Prop()
    _id:string;

    @Prop()
    name:string;

    @Prop()
    class:string;

}

export const UnitSchema = SchemaFactory.createForClass(Unit);