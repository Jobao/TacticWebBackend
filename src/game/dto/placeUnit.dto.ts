import { ApiProperty } from "@nestjs/swagger";
import { Unit } from "../schemas/unit.schema";
import { GameANDUserDTO } from "./gameUser.dto";
import { IsUUID } from "class-validator";
import { Target } from "src/unit/dto/unitAction.dto";
import { EquipmentIDDto } from "./equipmentID.dto";

export class PlaceUnitDto extends GameANDUserDTO{
    @IsUUID('4')
    @ApiProperty()
    unit_uuid:string;
    @ApiProperty({type:() =>Target})
    target:Target;

    @ApiProperty({type:() => EquipmentIDDto})
    equipment:EquipmentIDDto;
}