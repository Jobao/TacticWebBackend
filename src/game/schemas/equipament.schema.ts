import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { TupleStats, TupleStatsSchema } from "./stats.schema";

export type EquipmentDocument = Equipment & Document;
@Schema()
export class Equipment{

    @Prop()
    _id:string;

    @Prop()
    name:string

    @Prop({type: [TupleStatsSchema], autopopulate:true})
    stats:TupleStats[];

    //MAYBE: Agregar requerimientos para poder usar el equipe

}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
EquipmentSchema.plugin(require('mongoose-autopopulate'));
EquipmentSchema.loadClass(Equipment);