import { ApiProperty } from "@nestjs/swagger";
import { CreateItemDto } from "./create-item.dto";
import { EquipmentSlot } from "src/game/schemas/enums";
import { TupleStats } from "src/game/schemas/stats.schema";

export class CreateEquipableItemDTO extends CreateItemDto{
    @ApiProperty()
    slot:EquipmentSlot;
    @ApiProperty({type: ()=> [TupleStats]})
    stats:TupleStats[];
}