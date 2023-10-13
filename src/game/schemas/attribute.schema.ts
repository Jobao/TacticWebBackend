import { Prop } from "@nestjs/mongoose";
import { AttributesName, StatsName } from "./enums";

export class Attribute{
    @Prop()
    attributeName:StatsName;
    @Prop()
    amount:number;
}