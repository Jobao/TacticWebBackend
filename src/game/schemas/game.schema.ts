import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlacedUnit, PlacedUnitSchema } from './placedUnits.schema';
import { GameUnit } from './gameUnit.schema';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Target } from 'src/unit/dto/unitAction.dto';
import { Unit } from './unit.schema';
import { StatsName } from './enums';
import { GameOrder, GameOrderSchema } from './gameOrder.schema';
import { EquipmentOBJDto } from '../dto/equipmentOBJ.dto';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @ApiProperty()
  @Prop()
  _id: string;

  @ApiProperty()
  @Prop()
  sizeX: number; //size del tablero horizontal

  @ApiProperty()
  @Prop()
  sizeY: number; //size del tablero vertical

  @ApiProperty({ type: () => [PlacedUnit] })
  @Prop({ type: [PlacedUnitSchema], autopopulate: true })
  placedUnitList: PlacedUnit[];

  @ApiProperty()
  @Prop()
  isEnd: boolean;

  @ApiProperty()
  @Prop()
  isStart: boolean;

  @ApiProperty()
  @Prop()
  minUnits: number;

  @ApiProperty()
  @Prop()
  maxUnits: number;

  @ApiProperty()
  @Prop()
  owner_uuid: string;

  @ApiProperty()
  @Prop()
  turn: string;

  @ApiProperty()
  @Prop()
  gamePhase: string;

  @Prop({ type: [GameOrderSchema], autopopulate: true })
  gameOrder: GameOrder[];

  @Prop()
  isPublic: boolean;

  isInsideBoard(target: Target) {
    return target.x >= 0 && target.x < this.sizeX && target.y >= 0 && target.y < this.sizeY;
  }

  isOcupiedByAnotherUnit(target: Target) {
    //let res= false;
    let unit: GameUnit;
    for (let index = 0; index < this.placedUnitList.length; index++) {
      const element = this.placedUnitList[index];
      element.gameUnit.forEach((element2) => {
        //IMPROVE: CAmbiar por una funcion del array (FIND)
        if (target.x === element2.posX && target.y === element2.posY) {
          //res = true;
          unit = element2;
        }
      });
    }
    return unit;
  }

  getUserIndexOnPlacedUnitList(user_uuid: string): number {
    for (let userIndex = 0; userIndex < this.placedUnitList.length; userIndex++) {
      if (this.placedUnitList[userIndex].user_uuid === user_uuid) {
        //IMPROVE: Usar clases de JS
        return userIndex;
      }
    }
    return -1;
  }

  getPlacedUnit(user_uuid: string, unit_uuid: string) {
    let idx = this.getUserIndexOnPlacedUnitList(user_uuid);
    if (idx !== -1) {
      return this.placedUnitList[idx].getUnit(unit_uuid);
    }
  }

  placeNewUnit(user_uuid: string, unit: Unit, target: Target, equipmentDto: EquipmentOBJDto) {
    let idx = this.getUserIndexOnPlacedUnitList(user_uuid);
    if (idx !== -1) {
      let temp: GameUnit = new GameUnit();
      temp.unitBase_uuid = unit._id;
      temp.posX = target.x;
      temp.posY = target.y;

      temp.canPerformActionThisTurn = true;
      temp.canMove = true;
      temp.canAttack = true;
      temp.stats = unit.defaultStats; //asigno stats base
      temp.mainClassExperience = unit.findTupleClassExperience(unit.defaultMainClassId);
      if (unit.defaultMainClassId !== '') {
        temp.secondClassExperience = unit.findTupleClassExperience(unit.defaultSecondClassId);
      }
      if (equipmentDto) {
        //IMPROVE:

        temp.equipment.equipmentStats = [];
        temp.equip(equipmentDto.chest);
        temp.equip(equipmentDto.feet);
        temp.equip(equipmentDto.gloves);
        temp.equip(equipmentDto.head);
        temp.equip(equipmentDto.mainHand);
        temp.equip(equipmentDto.secondHand);
      }
      temp.currentHP = unit.getStats(StatsName.HP);
      temp.currentMP = unit.getStats(StatsName.MP);

      this.placedUnitList[idx].gameUnit.push(temp);
      return true;
    }
    return false;
  }

  isMyTurn(uuid: string): boolean {
    return this.turn === uuid;
  }

  isThisUnitPlace(unit_uuid: string, user_uuid: string) {
    let index = this.getUserIndexOnPlacedUnitList(user_uuid);
    let result = false;
    if (index >= 0) {
      //IMPROVE: CAmbiar por una funcion del array (FIND)
      this.placedUnitList[index].gameUnit.forEach((element) => {
        if (element.unitBase_uuid === unit_uuid) {
          result = true;
        } //TODO: al estar repetida terminar el bucle
      });
    }
    return result;
  }

  moveUnit(unit_uuid: string, user_uuid: string, x: number, y: number) {
    let index = this.getUserIndexOnPlacedUnitList(user_uuid);
    let result = false;
    if (index >= 0) {
      //TODO: CAmbiar por una funcion del array (FIND)
      this.placedUnitList[index].gameUnit.forEach((element) => {
        if (element.unitBase_uuid === unit_uuid) {
          element.posX = x;
          element.posY = y;
          result = true;
        }
      });
    }
    return result;
  }

  joinGame(user_uuid: string): boolean {
    if (this.getUserIndexOnPlacedUnitList(user_uuid) === -1) {
      //this.users_uuid.push(user_uuid);
      let place: PlacedUnit = new PlacedUnit(); //Esto porque no me dejaba hacer ...push({element.uuid ....}) directamente
      place.user_uuid = user_uuid;
      place.gameUnit = [];
      this.placedUnitList.push(place);
      return true;
    }
    return false;
  }

  leaveGame(user_uuid: string) {
    let index = this.getUserIndexOnPlacedUnitList(user_uuid);
    if (index !== -1) {
      this.placedUnitList.splice(index, 1);
    }
    return this.placedUnitList.length;
  }

  isOwner(user_uuid: string): boolean {
    return user_uuid === this.owner_uuid;
  }

  canPlaceMoreUnit(user_uuid: string) {
    let index = this.getUserIndexOnPlacedUnitList(user_uuid);
    if (index !== -1) {
      return this.placedUnitList[index].gameUnit.length < this.maxUnits;
    }
    return false;
  }

  canRemoveUnit(user_uuid: string) {
    let index = this.getUserIndexOnPlacedUnitList(user_uuid);
    if (index !== -1) {
      return this.placedUnitList[index].gameUnit.length >= 1;
    }
    return false;
  }

  getUnit(user_uuid: string, unit_uuid: string) {
    let index = this.getUserIndexOnPlacedUnitList(user_uuid);
    let unit: GameUnit;
    if (index !== -1) {
      return this.placedUnitList[index].getUnit(unit_uuid);
      //unit = this.placedUnitList[index].unitInfo.find((element) =>element.unitBase_uuid === unit_uuid);
    }
    return unit;
  }

  /**
   *
   * Calcula el orden de accion en base a la velocidad
   */
  calculateUnitOrderAction() {
    let xx: { u: string; uni: string; sp: number }[] = [];
    this.placedUnitList.forEach((placedUser) => {
      placedUser.gameUnit.forEach((unit) => {
        xx.push({
          u: placedUser.user_uuid,
          uni: unit.unitBase_uuid,
          sp: unit.getStats(StatsName.Speed),
        });
      });
    });
    xx = xx.sort((a, b) => a.sp - b.sp);
    xx.forEach((element) => {
      this.gameOrder.push({ user_uuid: element.u, unit_uuid: element.uni });
    });
  }
}

export const GameSchema = SchemaFactory.createForClass(Game);
GameSchema.plugin(require('mongoose-autopopulate'));
GameSchema.loadClass(Game); //https://github.com/nestjs/mongoose/issues/408#issuecomment-917179516
