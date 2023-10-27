import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EffectSchema, Effect } from "src/game/schemas/effect.schema";
import { Item } from "./item.schema";

export type EquipableItemDocument = EquipableItem & Document;

@Schema()
export class EquipableItem extends Item{

    @Prop()
    slot: string

    @Prop({type:[EffectSchema], autopopulate:true})
    effects:[Effect];
}

export const EquipableItemSchema = SchemaFactory.createForClass(EquipableItem);
EquipableItemSchema.loadClass(EquipableItem);