import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TypeEffect, TypeAffect } from "./enums";
import { TupleAttribute } from "./attribute.schema";
import { TupleStats, TupleStatsSchema } from "./stats.schema";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type EffectDocument = Effect & Document
@Schema({id:false})
export class Effect{
    @ApiProperty({type: ()=> [TupleStats]})
    @Prop({type:TupleStatsSchema, autopopulate:true})
    stats:TupleStats;
    @ApiProperty({enum: TypeEffect})
    @Prop(TypeEffect)
    typeEffect:TypeEffect;
    @Prop()
    turn:number;
    @Prop(TypeAffect)
    unitAffect:TypeAffect;
}

export const EffectSchema = SchemaFactory.createForClass(Effect);
EffectSchema.loadClass(Effect);


