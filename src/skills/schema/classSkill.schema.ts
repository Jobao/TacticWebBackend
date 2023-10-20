import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Effect } from "../../game/schemas/effect.schema";
import { Cost } from "../../game/schemas/cost.schema";
import { Document } from 'mongoose';
import { TupleAttribute } from "../../game/schemas/attribute.schema";
import { UnitClass } from "../../unit-clases/schema/unitClass.schema";
import { TupleStats } from "../../game/schemas/stats.schema";

export type ClassSkillDocument = ClassSkill & Document;

@Schema()
export class ClassSkill{
    @Prop()
    _id:string
    @Prop()
    name:string;
    @Prop()
    requiredLvl:number;
    @Prop()
    range:number;
    //AOE: number
    @Prop([Effect])
    effectList:Effect[];

    @Prop(TupleStats)
    cost:TupleStats;

    @Prop()
    allowedClasses:string[]
}

export const ClassSkillSchema = SchemaFactory.createForClass(ClassSkill);
ClassSkillSchema.plugin(require('mongoose-autopopulate'));
ClassSkillSchema.loadClass(ClassSkill);