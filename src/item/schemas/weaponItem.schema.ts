import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EffectSchema, Effect } from "src/game/schemas/effect.schema";
import { Item } from "./item.schema";
import { EquipableItem } from "./equipableItem.schema";

export type WeaponItemDocument = WeaponItem & Document;

@Schema()
export class WeaponItem extends EquipableItem{

    @Prop()
    range:number
}

export const WeaponItemSchema = SchemaFactory.createForClass(WeaponItem);
WeaponItemSchema.loadClass(WeaponItem);