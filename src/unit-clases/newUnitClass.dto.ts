import { TupleAttribute } from "src/game/schemas/attribute.schema";
import { TupleRequiredClass } from "src/game/schemas/requiredClass.schema";

export class NewUnitClassDTO{
    _id:string;//Es su nombre

    baseAttributes:TupleAttribute[];

    requiredClass:TupleRequiredClass[];

    requiredExp:number[];
}