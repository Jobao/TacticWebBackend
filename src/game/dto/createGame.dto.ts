import { ApiProperty } from "@nestjs/swagger";
import { GameANDUserDTO } from "./gameUser.dto";
import { PlaceUnitDto } from "./placeUnit.dto";
import { IsNumber } from "class-validator";

export class CreateGameDto extends GameANDUserDTO{
    @IsNumber()
    @ApiProperty()
    minUnits:number;

    @IsNumber()
    @ApiProperty()
    maxUnits:number;

    @IsNumber()
    @ApiProperty()
    sizeX:number;

    @IsNumber()
    @ApiProperty()
    sizeY:number;
}