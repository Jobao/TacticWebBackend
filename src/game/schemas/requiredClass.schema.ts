import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TupleRequiredClassDocument= TupleRequiredClass & Document;

@Schema({id:false})
export class TupleRequiredClass{
    @Prop()
    _id:string;
    @Prop()
    experience:number;

    addExperience(amount:number){
        this.experience += amount;

    }
}

export const TupleRequiredClassSchema = SchemaFactory.createForClass(TupleRequiredClass);
TupleRequiredClassSchema.loadClass(TupleRequiredClass);