import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { Document} from "mongoose";
import { Equipment } from "./equipament.schema";
import { EquipableItem } from "src/item/schemas/equipableItem.schema";
import { EquipmentSlot } from "./enums";

export type UnitEquipedDocument = UnitEquiped & Document;

@Schema({_id:false})
export class UnitEquiped{
    
    @Prop({ref: Equipment.name})
    head:string;

    @Prop({ref: Equipment.name})
    chest:string

    equip(equipment:EquipableItem){
        switch (equipment.slot) {
            case EquipmentSlot.HEAD:
                this.head = equipment._id
                break;
            case EquipmentSlot.CHEST:
            case EquipmentSlot.GLOVES:
            case EquipmentSlot.FEET:
            case EquipmentSlot.MAINHAND:
            case EquipmentSlot.SECONDHAND:
            case EquipmentSlot.AMULET:
        
            default:
                break;
        }
    }

    unequip(slot:EquipmentSlot){
        let result;
        switch (slot) {
            case EquipmentSlot.HEAD:
                result = this.head;
                this.head = "";
                break;
            case EquipmentSlot.CHEST:
            case EquipmentSlot.GLOVES:
            case EquipmentSlot.FEET:
            case EquipmentSlot.MAINHAND:
            case EquipmentSlot.SECONDHAND:
            case EquipmentSlot.AMULET:
        
            default:
                break;
        }
        return result;
    }

}

export const UnitEquipedSchema = SchemaFactory.createForClass(UnitEquiped);
UnitEquipedSchema.loadClass(UnitEquiped);