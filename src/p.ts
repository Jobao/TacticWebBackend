import { TupleStats } from './game/schemas/stats.schema';

class GameUnit {
  unit_uuid: string;
  posX: number;
  posY: number;
  currentHP: number;
  currentMP: number;
  currentClassID: string;
  currentExp: number;
  currentLvl: number;
  currentClassPoint: number;
  currentStats: TupleStats[];
}

class Unit {
  unit_uuid: string;
  name: string;
  classExp: {
    idClass: string;
    currentLvl: number;
    currentExp: number;
    currentClassPoint: number;
    habilidadesCompradas;
  }[];
  defaultClass: string;
  defaultEquipment: string;
  defaultStats: TupleStats[];
}

class UnitClass {
  _id: string; //nombre
  atributes;
  spells;
  requiredLevel: number[];
  requieredClass: { classId: string; level: number }[];
}
