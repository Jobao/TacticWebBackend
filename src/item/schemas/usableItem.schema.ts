import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Item } from "./item.schema";
import { Effect, EffectSchema } from "src/game/schemas/effect.schema";

export type UsableItemDocument = UsableItem & Document;
@Schema()
export class UsableItem extends Item{

    @Prop({type:[EffectSchema], autopopulate:true})
    effects:[Effect];
}

export const UsableItemSchema = SchemaFactory.createForClass(UsableItem);
UsableItemSchema.loadClass(UsableItem);