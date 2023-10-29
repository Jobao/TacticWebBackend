import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EffectSchema, Effect } from "src/game/schemas/effect.schema";
import { Item } from "./item.schema";
import { EquipmentSlot } from "src/game/schemas/enums";
import { TupleStats, TupleStatsSchema } from "src/game/schemas/stats.schema";

export type EquipableItemDocument = EquipableItem & Document;

@Schema()
export class EquipableItem extends Item{

    @Prop()
    slot: EquipmentSlot

    @Prop({type:[EffectSchema], autopopulate:true})
    effects:[Effect];

    @Prop({type:[TupleStatsSchema], autopopulate:true})
    stats:[TupleStats];
}

export const EquipableItemSchema = SchemaFactory.createForClass(EquipableItem);
EquipableItemSchema.loadClass(EquipableItem);