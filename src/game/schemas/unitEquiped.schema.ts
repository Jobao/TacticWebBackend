import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EquipableItem } from 'src/item/schemas/equipableItem.schema';
import { EquipmentSlot } from './enums';
import { Item } from 'src/item/schemas/item.schema';
import { TupleStats, TupleStatsSchema } from './stats.schema';

export type UnitEquipedDocument = UnitEquiped & Document;

@Schema({ _id: false })
export class UnitEquiped {
  constructor() {
    this.head = '';
    this.chest = '';
    this.gloves = '';
    this.feet = '';
    this.mainHand = '';
    this.secondHand = '';
    this.amulet = '';
    this.equipmentStats = [];
  }
  @Prop({ ref: Item.name })
  head: string;

  @Prop({ ref: Item.name })
  chest: string;

  @Prop({ ref: Item.name })
  gloves: string;

  @Prop({ ref: Item.name })
  feet: string;

  @Prop({ ref: Item.name })
  mainHand: string;

  @Prop({ ref: Item.name })
  secondHand: string;

  @Prop({ ref: Item.name })
  amulet: string;

  @Prop({ type: [TupleStatsSchema], autopopulate: true })
  equipmentStats: TupleStats[];

  equip(equipment: EquipableItem) {
    if (equipment) {
      switch (equipment.slot) {
        case EquipmentSlot.HEAD:
          if (this.head !== equipment._id) {
            this.head = equipment._id;
            this.addStats(equipment.stats);
          }
          break;
        case EquipmentSlot.CHEST:
          if (this.chest !== equipment._id) {
            this.chest = equipment._id;
            this.addStats(equipment.stats);
          }
          break;
        case EquipmentSlot.GLOVES:
          if (this.gloves !== equipment._id) {
            this.gloves = equipment._id;
            this.addStats(equipment.stats);
          }
          break;
        case EquipmentSlot.FEET:
          if (this.feet !== equipment._id) {
            this.feet = equipment._id;
            this.addStats(equipment.stats);
          }
          break;
        case EquipmentSlot.MAINHAND:
          if (this.mainHand !== equipment._id) {
            this.mainHand = equipment._id;
            this.addStats(equipment.stats);
          }
          break;
        case EquipmentSlot.SECONDHAND:
          if (this.secondHand !== equipment._id) {
            this.secondHand = equipment._id;
            this.addStats(equipment.stats);
          }
          break;
        case EquipmentSlot.AMULET:
          if (this.amulet !== equipment._id) {
            this.amulet = equipment._id;
            this.addStats(equipment.stats);
          }
          break;
        default:
          break;
      }
    }
  }

  unequip(slot: EquipmentSlot) {
    let result;
    switch (slot) {
      case EquipmentSlot.HEAD:
        result = this.head;
        this.head = '';
        break;
      case EquipmentSlot.CHEST:
      case EquipmentSlot.GLOVES:
      case EquipmentSlot.FEET:
      case EquipmentSlot.MAINHAND:
      case EquipmentSlot.SECONDHAND:
      case EquipmentSlot.AMULET:

      default:
        break;
    }
    return result;
  }

  addStats(stats: [TupleStats]) {
    let index = -1;
    stats.forEach((element) => {
      const finded = this.equipmentStats.find((s, i) => {
        if (s.statsName === element.statsName) {
          index = i;
          return true;
        }
        return false;
      });

      if (!finded) {
        this.equipmentStats.push(element);
      } else {
        this.equipmentStats[index].amount += element.amount;
      }
    });
  }
}

export const UnitEquipedSchema = SchemaFactory.createForClass(UnitEquiped);
UnitEquipedSchema.loadClass(UnitEquiped);
