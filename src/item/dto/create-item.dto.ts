import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
    _id:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    name:string;
}
