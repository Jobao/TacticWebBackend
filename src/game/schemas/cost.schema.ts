import { Prop } from "@nestjs/mongoose";
import { Attribute } from "./attribute.schema";
import { Stats } from "./stats.schema";

export class Cost{
    @Prop()
    amount:number;
    @Prop()
    resource:Stats;
}