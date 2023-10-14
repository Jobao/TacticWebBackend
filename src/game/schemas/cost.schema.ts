import { Prop } from "@nestjs/mongoose";
import { TupleAttribute } from "./attribute.schema";
import { TupleStats } from "./stats.schema";

export class Cost{
    @Prop()
    amount:number;
    @Prop()
    resource:TupleStats;
}