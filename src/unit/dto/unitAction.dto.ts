import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { GameANDUserDTO } from "src/game/dto/gameUser.dto";

export class UnitActionDto extends GameANDUserDTO{
    unit_uuid:string;
    action:UnitAction;
    
}

export class Target{
    @IsNumber()
    @ApiProperty()
    x:number;
    @IsNumber()
    @ApiProperty()
    y:number;
}

export class UnitAction{
    type:string;
    target:Target;
}
