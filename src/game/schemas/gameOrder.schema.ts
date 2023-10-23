import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GameOrderDocument = GameOrder & Document


@Schema({_id:false})
export class GameOrder{
    @Prop()
    user_uuid:string;
    @Prop()
    unit_uuid:string;
}

export const GameOrderSchema = SchemaFactory.createForClass(GameOrder);
GameOrderSchema.loadClass(GameOrder);