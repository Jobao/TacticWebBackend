import { Prop, Schema } from "@nestjs/mongoose";
import { Attribute } from "./attribute.schema";

@Schema()
export class UnitClass{
    @Prop()
    classId:string;//Es su nombre

    @Prop([Attribute])
    baseAttributes:Attribute[];

    requiredBaseClass:string;

    requiredExp:number[];
}