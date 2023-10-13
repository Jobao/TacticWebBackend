import { Prop } from "@nestjs/mongoose";
import { TypeEffect, TypeAffect } from "./enums";
import { Attribute } from "./attribute.schema";

export class Effect{
    @Prop()
    attribute:Attribute;
    @Prop(TypeEffect)
    typeEffect:TypeEffect;
    @Prop()
    turn:number;
    @Prop(TypeAffect)
    unitAffect:TypeAffect;
}


