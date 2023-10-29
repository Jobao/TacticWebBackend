import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { Document} from "mongoose";
import { EquipableItem } from "src/item/schemas/equipableItem.schema";
import { EquipmentSlot } from "./enums";
import { Item } from "src/item/schemas/item.schema";

export type UnitEquipedDocument = UnitEquiped & Document;

@Schema({_id:false})
export class UnitEquiped{
    
    @Prop({ref: Item.name})
    head:string;

    @Prop({ref: Item.name})
    chest:string

    @Prop({ref: Item.name})
    gloves:string

    @Prop({ref: Item.name})
    feet:string

    @Prop({ref: Item.name})
    mainHand:string

    @Prop({ref: Item.name})
    secondHand:string

    @Prop({ref: Item.name})
    amulet:string

    equip(equipment:EquipableItem){
        switch (equipment.slot) {
            case EquipmentSlot.HEAD:
                this.head = equipment._id
                break;
            case EquipmentSlot.CHEST:
                this.chest = equipment._id;
                break
            case EquipmentSlot.GLOVES:
                this.gloves = equipment._id;
                break;
            case EquipmentSlot.FEET:
                this.feet = equipment._id;
                break;
            case EquipmentSlot.MAINHAND:
                this.mainHand = equipment._id;
                break;
            case EquipmentSlot.SECONDHAND:
                this.secondHand = equipment._id;
                break;
            case EquipmentSlot.AMULET:
                this.amulet = equipment._id;
                break;
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