import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GameANDUserDTO{

    //@IsUUID('4')
    user_uuid: string;
    //@IsUUID('4')
    game_uuid: string;
}