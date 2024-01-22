import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TupleStats, TupleStatsSchema } from './stats.schema';
import { UnitClass } from '../../unit-clases/schema/unitClass.schema';
import { AttributesName, StatsName } from './enums';
import { UnitEquiped, UnitEquipedSchema } from './unitEquiped.schema';
import {
  TupleClassExperience,
  TupleClassExperienceSchema,
} from './classExperience.schema';

export type UnitDocument = Unit & Document;

@Schema()
export class Unit {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  defaultMainClassId: string;

  @Prop()
  defaultSecondClassId: string;

  @Prop({ type: UnitEquipedSchema, autopopulate: true })
  defaultEquipment: UnitEquiped;

  @Prop({ type: [TupleClassExperienceSchema], autopopulate: true })
  classExperience: TupleClassExperience[];

  @Prop({ type: [TupleStatsSchema], autopopulate: true })
  defaultStats: TupleStats[];

  changeMainClass(nClass: UnitClass) {
    if (this.defaultMainClassId !== nClass._id) {
      this.defaultMainClassId = nClass._id;
      if (!this.findTupleClassExperience(nClass._id)) {
        let tpRC = new TupleClassExperience();
        tpRC._id = nClass._id;
        tpRC.currentExperience = 0;
        tpRC.currentClassLevel = 0;
        tpRC.currentPoints = 0;
        tpRC.habilidadesDesbloquedas = [];
        this.classExperience.push(tpRC);
      } else {
        //TODO: Recuperar los datos guardados
      }
      this.calculeStats(nClass);
      return true;
    }
    return false;
  }

  increaseClassExperience(amount: number, nClass: UnitClass) {
    let tp = this.findTupleClassExperience(nClass._id);
    if (tp) {
      if (tp.addExperience(amount, nClass)) {
        this.levelUp();
      }
    } else {
      console.log('error: no se encontro el tuple de experiencia');
    }
  }

  findTupleClassExperience(classId: string) {
    return this.classExperience.find((x) => {
      return x._id === classId;
    });
  }
  levelUp() {}

  calculeStats(nClass: UnitClass) {
    this.defaultStats = [];

    nClass.baseAttributes.forEach((element) => {
      switch (element.attributeName) {
        case AttributesName.STAMINA:
          this.defaultStats.push({
            statsName: StatsName.HP,
            amount: element.amountModificado(),
          });
          break;
        case AttributesName.SPIRIT:
          this.defaultStats.push({
            statsName: StatsName.MP,
            amount: element.amountModificado(),
          });
          this.defaultStats.push({
            statsName: StatsName.MPRegen,
            amount: element.amountModificado(),
          });
          break;
        case AttributesName.STRENGTH:
          this.defaultStats.push({
            statsName: StatsName.PA,
            amount: element.amountModificado(),
          });
          this.defaultStats.push({
            statsName: StatsName.PhysicDefense,
            amount: element.amountModificado(),
          });
          break;

        case AttributesName.INTELLECT:
          this.defaultStats.push({
            statsName: StatsName.MA,
            amount: element.amountModificado(),
          });
          this.defaultStats.push({
            statsName: StatsName.MagicalDefence,
            amount: element.amountModificado(),
          });
          break;
        case AttributesName.AGILITY:
          this.defaultStats.push({
            statsName: StatsName.Dodge,
            amount: element.amountModificado(),
          });
          this.defaultStats.push({
            statsName: StatsName.Speed,
            amount: element.amountModificado(),
          });
          break;
        default:
          break;
      }
    });
  }

  getStats(sta: StatsName) {
    let result: number;
    this.defaultStats.forEach((element) => {
      if (element.statsName === sta) {
        result = element.amount;
      }
    });
    return result;
  }
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.plugin(require('mongoose-autopopulate'));
UnitSchema.loadClass(Unit);
