import { TupleRequiredClass } from "src/game/schemas/requiredClass.schema";
import { TupleStats } from "src/game/schemas/stats.schema";

export class CreateUnitDto{
    user_uuid:string;
    
    _id:string;

    name:string;

    class_id:string;

    HP:number;

    MP:number

    battleActions:string;

    currentClassId:string;

    classExperience:TupleRequiredClass[]

    stats:TupleStats[];
}