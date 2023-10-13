import { Prop } from "@nestjs/mongoose";
import { Attribute } from "./attribute.schema";

export class Cost{
    @Prop()
    amount:number;
    @Prop()
    resource:Attribute;
}