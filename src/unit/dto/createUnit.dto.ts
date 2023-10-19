import { ApiProperty } from "@nestjs/swagger";

export class CreateUnitDto{
    @ApiProperty()
    user_uuid:string;
    @ApiProperty()
    name:string;
    @ApiProperty()
    class_id:string;
    @ApiProperty()
    currentClassId:string;
}