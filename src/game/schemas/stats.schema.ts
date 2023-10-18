import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StatsName } from "./enums";
import { Document } from "mongoose";

export type TupleStatsDocument = TupleStats & Document

@Schema({_id:false})
export class TupleStats{
    @Prop()
    statsName: StatsName;
    @Prop()
    amount:number;
}

export const TupleStatsSchema = SchemaFactory.createForClass(TupleStats);
TupleStatsSchema.loadClass(TupleStats);