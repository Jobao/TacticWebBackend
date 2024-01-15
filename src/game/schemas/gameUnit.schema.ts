import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { TupleStatsSchema, TupleStats } from './stats.schema';
import { EquipmentSlot, StatsName } from './enums';
import { UnitEquiped, UnitEquipedSchema } from './unitEquiped.schema';
import { EquipableItem } from 'src/item/schemas/equipableItem.schema';
export type GameUnitDocument = GameUnit & Document;

@Schema({ _id: false })
export class GameUnit {
  constructor() {
    this.equipment = new UnitEquiped();
    this.stats = [];
  }

  @ApiProperty()
  @Prop()
  unitBase_uuid: string;

  @ApiProperty()
  @Prop()
  posX: number;

  @ApiProperty()
  @Prop()
  posY: number;

  @ApiProperty()
  @Prop()
  currentHP: number;

  @ApiProperty()
  @Prop()
  currentMP: number;

  @ApiProperty()
  @Prop()
  canPerformActionThisTurn: boolean;

  @ApiProperty()
  @Prop()
  canMove: boolean;

  @ApiProperty()
  @Prop()
  canAttack: boolean;

  @ApiProperty()
  @Prop({ type: [TupleStatsSchema], autopopulate: true, default: [] })
  stats: TupleStats[];

  @Prop({ type: UnitEquipedSchema, autopopulate: true })
  equipment: UnitEquiped;

  ocupied(x: number, y: number): boolean {
    return x === this.posX && y === this.posY;
  }
  move(x: number, y: number): boolean {
    if (this.canMove) {
      this.posX = x;
      this.posY = y;
      //this.canMove = false;
      if (!this.canAttack) {
        this.canPerformActionThisTurn = false;
      }
      return true;
    }
    return false;
  }

  attack(attackedUnit: GameUnit) {
    if (this.canAttack) {
      attackedUnit.receiveDamage(this.getStats(StatsName.PA));
      this.canAttack = false;
      if (!this.canMove) {
        this.canPerformActionThisTurn = false;
      }
    }
  }

  newTurn() {
    this.canMove = true;
    this.canAttack = true;
    this.canPerformActionThisTurn = true;
  }

  wait() {
    this.canAttack = false;
    this.canMove = false;
    this.canPerformActionThisTurn = false;
  }

  receiveDamage(dmg: number) {
    if (this.currentHP > 0) {
      this.currentHP -= dmg;
      if (this.currentHP <= 0) {
        console.log('DEATH');
      }
    } else {
      console.log('Target muerto');
    }
  }

  getStats(stat: StatsName) {
    //let res:number;
    let result = this.stats.find((x) => {
      return x.statsName === stat;
    });
    /*this.stats.forEach(element => {
            if(element.statsName === stat){
                res = element.amount;
            }
        });*/

    return result.amount;
  }

  equip(nEquip: EquipableItem) {
    if (nEquip) {
      this.equipment.equip(nEquip);
      nEquip.stats.forEach((element) => {
        this.addStatsValue(element);
      });
    }
  }

  unequip(uEquip: EquipableItem) {
    uEquip.stats.forEach((element) => {
      this.removeStatsValue(element);
    });
  }

  addStatsValue(tuple: TupleStats) {
    let idx = this.stats.findIndex((x) => {
      return x.statsName === tuple.statsName;
    });
    if (idx !== -1) {
      this.stats[idx].amount += tuple.amount;
    } else {
      this.stats.push(tuple);
    }
  }

  removeStatsValue(tuple: TupleStats) {
    let idx = this.stats.findIndex((x) => {
      return x.statsName === tuple.statsName;
    });
    if (idx !== -1) {
      this.stats[idx].amount -= tuple.amount;
    }
  }
}
export const GameUnitSchema = SchemaFactory.createForClass(GameUnit);
GameUnitSchema.loadClass(GameUnit);
