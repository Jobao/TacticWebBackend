import { Prop } from "@nestjs/mongoose";
import { Attributes_Name } from "./enums";

export class Attribute{
    @Prop()
    attributeName:Attributes_Name;
    @Prop()
    amount:number;
}