import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { Document} from "mongoose";
import { Equipment } from "./equipament.schema";

export type UnitEquipedDocument = UnitEquiped & Document;

@Schema({_id:false})
export class UnitEquiped{
    
    @Prop({ref: Equipment.name})
    head:string;

    @Prop({ref: Equipment.name})
    chest:string

}

export const UnitEquipedSchema = SchemaFactory.createForClass(UnitEquiped);
UnitEquipedSchema.loadClass(UnitEquiped);