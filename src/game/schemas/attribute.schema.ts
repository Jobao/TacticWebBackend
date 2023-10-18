import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AttributesName, StatsName } from "./enums";
import { Document } from "mongoose";

export type TupleAttributeDocument = TupleAttribute & Document

@Schema({_id:false})
export class TupleAttribute{
    @Prop()
    attributeName:AttributesName;
    @Prop()
    amount:number;
}

export const TupleAttributeSchema = SchemaFactory.createForClass(TupleAttribute);
TupleAttributeSchema.loadClass(TupleAttribute);