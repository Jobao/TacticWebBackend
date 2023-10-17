import { TupleRequiredClass } from "src/game/schemas/requiredClass.schema";
import { TupleStats } from "src/game/schemas/stats.schema";

export class CreateUnitDto{
    user_uuid:string;
    name:string;

    class_id:string;

    currentClassId:string;
}