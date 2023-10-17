import { Prop } from "@nestjs/mongoose";
import { StatsName } from "./enums";

export class TupleStats{
    @Prop()
    statsName: StatsName;
    @Prop()
    amount:number;
}