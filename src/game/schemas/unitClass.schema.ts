import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Attribute } from "./attribute.schema";
import { RequiredClass } from "./requiredClass.schema";
import { Document } from "mongoose";

export type UnitClassDocument = UnitClass & Document;
@Schema()
export class UnitClass{
    @Prop()
    _id:string;//Es su nombre

    @Prop([Attribute])
    baseAttributes:Attribute[];

    @Prop([RequiredClass])
    requiredClass:RequiredClass[];

    @Prop()
    requiredExp:number[];
}

export const UnitClassSchema = SchemaFactory.createForClass(UnitClass);
//console.log(GameSchema.paths);
UnitClassSchema.plugin(require('mongoose-autopopulate'));
UnitClassSchema.loadClass(UnitClass);