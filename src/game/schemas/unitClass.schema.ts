import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TupleAttribute } from "./attribute.schema";
import { TupleRequiredClass } from "./requiredClass.schema";
import { Document } from "mongoose";

export type UnitClassDocument = UnitClass & Document;
@Schema()
export class UnitClass{
    @Prop()
    _id:string;//Es su nombre

    @Prop([TupleAttribute])
    baseAttributes:TupleAttribute[];

    @Prop([TupleRequiredClass])
    requiredClass:TupleRequiredClass[];


    @Prop()
    requiredExp:number[];
}

export const UnitClassSchema = SchemaFactory.createForClass(UnitClass);
//console.log(GameSchema.paths);
UnitClassSchema.plugin(require('mongoose-autopopulate'));
UnitClassSchema.loadClass(UnitClass);