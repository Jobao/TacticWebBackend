import { Prop } from "@nestjs/mongoose";
import { TypeEffect, TypeAffect } from "./enums";
import { Attribute } from "./attribute.schema";
import { Stats } from "./stats.schema";

export class Effect{
    @Prop()
    stats:Stats;
    @Prop(TypeEffect)
    typeEffect:TypeEffect;
    @Prop()
    turn:number;
    @Prop(TypeAffect)
    unitAffect:TypeAffect;
}


