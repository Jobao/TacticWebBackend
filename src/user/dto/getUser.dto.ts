import { Unit } from "src/game/schemas/unit.schema";
import { CreateUserDto } from "./createUser.dto";

export class GetUserDto{
    _id: string;
    user:string;
    displayName:string;
    createdUnits: Unit[];
}