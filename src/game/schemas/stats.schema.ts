import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StatsName } from "./enums";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type TupleStatsDocument = TupleStats & Document

@Schema({_id:false})
export class TupleStats{
    @ApiProperty()
    @Prop()
    statsName: StatsName;
    
    @ApiProperty()
    @Prop()
    amount:number;
}

export const TupleStatsSchema = SchemaFactory.createForClass(TupleStats);
TupleStatsSchema.loadClass(TupleStats);