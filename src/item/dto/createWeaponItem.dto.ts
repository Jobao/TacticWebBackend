import { ApiProperty } from "@nestjs/swagger";
import { CreateEquipableItemDTO as CreateEquipableItemDTO } from "./createEquipableItem.dto";

export class CreateWeaponItemDTO extends CreateEquipableItemDTO{

    @ApiProperty()
    range:number;
}