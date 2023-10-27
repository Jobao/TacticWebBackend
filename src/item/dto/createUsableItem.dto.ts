import { ApiProperty } from "@nestjs/swagger";
import { CreateItemDto } from "./create-item.dto";
import { Effect } from "src/game/schemas/effect.schema";

export class CreateUsableItemDTO extends CreateItemDto{

    @ApiProperty({type: ()=> [Effect]})
    effect:Effect[]
}