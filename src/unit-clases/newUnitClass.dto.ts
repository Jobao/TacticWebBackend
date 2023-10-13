import { Attribute } from "src/game/schemas/attribute.schema";
import { RequiredClass } from "src/game/schemas/requiredClass.schema";

export class NewUnitClassDTO{
    _id:string;//Es su nombre

    baseAttributes:Attribute[];

    requiredClass:RequiredClass[];

    requiredExp:number[];
}