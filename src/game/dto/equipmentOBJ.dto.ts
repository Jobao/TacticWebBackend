import { EquipableItem } from "src/item/schemas/equipableItem.schema";
import { WeaponItem } from "src/item/schemas/weaponItem.schema";

export class EquipmentOBJDto{
    head?:EquipableItem;
    chest?:EquipableItem;
    gloves?:EquipableItem;
    feet?:EquipableItem;
    mainHand?:WeaponItem;
    secondHand?:WeaponItem;
    amulet?:EquipableItem
}