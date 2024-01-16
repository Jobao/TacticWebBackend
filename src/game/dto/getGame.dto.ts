import { GameOrder } from '../schemas/gameOrder.schema';
import { TupleStats } from '../schemas/stats.schema';
import { UnitEquiped } from '../schemas/unitEquiped.schema';

export class GetGameDTO {
  _id: string;

  sizeX: number; //size del tablero horizontal

  sizeY: number; //size del tablero vertical

  placedUnitList: PlacedUnitDTO[];

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

  equipment: UnitEquiped;
}
