import { Item } from 'src/item/schemas/item.schema';
import { GameOrder } from '../schemas/gameOrder.schema';
import { TupleStats } from '../schemas/stats.schema';
import { UnitEquiped } from '../schemas/unitEquiped.schema';
import { EquipableItem } from 'src/item/schemas/equipableItem.schema';
import { WeaponItem } from 'src/item/schemas/weaponItem.schema';
import { Game } from '../schemas/game.schema';
import { PlacedUnit } from '../schemas/placedUnits.schema';
import { CacheService } from 'src/game-cache/cache.service';
import { GameUnit } from '../schemas/gameUnit.schema';
import { EquipmentOBJDto } from './equipmentOBJ.dto';
import { TupleClassExperience } from '../schemas/classExperience.schema';

export class GetGameDTO {
  constructor(game: Game, cache: CacheService) {
    this._id = game._id;
    this.gameOrder = game.gameOrder;
    this.gamePhase = game.gamePhase;
    this.isEnd = game.isEnd;
    this.isStart = game.isStart;
    this.maxUnits = game.maxUnits;
    this.minUnits = game.minUnits;
    this.owner_uuid = game.owner_uuid;
    this.unitList = [];
    game.placedUnitList.forEach((user) => {
      user.gameUnit.forEach((unit) => {
        this.unitList.push(new PlacedUnitDTO(user.user_uuid, unit, cache));
      });
    });
    this.sizeX = game.sizeX;
    this.sizeY = game.sizeY;
  }
  _id: string;

  sizeX: number; //size del tablero horizontal

  sizeY: number; //size del tablero vertical

  unitList: PlacedUnitDTO[];

  isEnd: boolean;

  isStart: boolean;

  minUnits: number;

  maxUnits: number;

  owner_uuid: string;

  turn: string;

  gamePhase: string;

  gameOrder: GameOrder[];
}

export class PlacedUnitDTO {
  constructor(user: string, unit: GameUnit, cache: CacheService) {
    this.user_uuid = user;
    this.unitBase_uuid = unit.unitBase_uuid;
    this.posX = unit.posX;
    this.posY = unit.posY;
    this.currentHP = unit.currentHP;
    this.currentMP = unit.currentMP;
    this.canPerformActionThisTurn = unit.canPerformActionThisTurn;
    this.canMove = unit.canMove;
    this.canAttack = unit.canAttack;
    this.stats = unit.stats;
    this.equipment = this.createEquipment(unit.equipment, cache);
    this.mainClassExperience = unit.mainClassExperience;
    this.secondClassExperience = unit.secondClassExperience;
  }
  user_uuid: string;

  unitBase_uuid: string;

  posX: number;

  posY: number;

  currentHP: number;

  currentMP: number;

  canPerformActionThisTurn: boolean;

  canMove: boolean;

  canAttack: boolean;

  stats: TupleStats[];

  equipment: EquipmentOBJDto;

  mainClassExperience: TupleClassExperience;

  secondClassExperience: TupleClassExperience;

  createEquipment(equip: UnitEquiped, cache: CacheService) {
    let aux = new EquipmentOBJDto();
    cache.EquipableItemCache.getInCacheOrBD(equip.amulet).then((x) => {
      aux.amulet = x;
    });
    cache.EquipableItemCache.getInCacheOrBD(equip.chest).then((x) => {
      aux.chest = x;
    });
    cache.EquipableItemCache.getInCacheOrBD(equip.feet).then((x) => {
      aux.feet = x;
    });
    cache.EquipableItemCache.getInCacheOrBD(equip.gloves).then((x) => {
      aux.gloves = x;
    });
    cache.EquipableItemCache.getInCacheOrBD(equip.head).then((x) => {
      aux.head = x;
    });
    cache.WeaponItemCache.getInCacheOrBD(equip.mainHand).then((x) => {
      aux.mainHand = x;
    });
    cache.WeaponItemCache.getInCacheOrBD(equip.secondHand).then((x) => {
      aux.secondHand = x;
    });

    return aux;
  }
}
