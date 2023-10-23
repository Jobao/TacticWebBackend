import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GameOrderDocument = GameOrder & Document


@Schema({_id:false})
export class GameOrder{
    user_uuid:string;
    unit_uuid:string;
}

export const GameOrderSchema = SchemaFactory.createForClass(GameOrder);
GameOrderSchema.loadClass(GameOrder);