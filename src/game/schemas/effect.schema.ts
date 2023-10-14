import { Prop } from "@nestjs/mongoose";
import { TypeEffect, TypeAffect } from "./enums";
import { TupleAttribute } from "./attribute.schema";
import { TupleStats } from "./stats.schema";

export class Effect{
    @Prop()
    stats:TupleStats;
    @Prop(TypeEffect)
    typeEffect:TypeEffect;
    @Prop()
    turn:number;
    @Prop(TypeAffect)
    unitAffect:TypeAffect;
}


