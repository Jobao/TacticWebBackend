import { Prop } from "@nestjs/mongoose";
import { AttributesName, StatsName } from "./enums";

export class TupleAttribute{
    @Prop()
    attributeName:StatsName;
    @Prop()
    amount:number;
}