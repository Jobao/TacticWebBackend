import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/game-cache/cache.service';
import { Unit } from 'src/game/schemas/unit.schema';
import { UnitClass } from 'src/unit-clases/schema/unitClass.schema';
import { UnitClassMongoRepository } from 'src/mongodb/repositories/unitClassMongoRepository';
import { TupleClassExperience } from 'src/game/schemas/classExperience.schema';

@Injectable()
export class UnitClasesService {
  constructor(
    private mongooseService: UnitClassMongoRepository,
    private cacheService: CacheService,
  ) {
    this.loadAllClassesInCache();
  }

  addNewClass(nClass: UnitClass) {
    this.mongooseService.create(nClass);
  }

  async findOneClass(class_id: string) {
    return await this.cacheService.UnitClassCache.getInCacheOrBD(class_id);
  }

  getAllClasses() {
    return this.mongooseService.findAll();
  }

  async getAllNameClass() {
    return await this.mongooseService.getAllNameClass();
  }
  /**
   * si puede usar la clase, la devuleve, sino NULL
   * @param class_id
   * @param unit
   * @returns
   */
  canUseThisClass(class_id: string, unit: Unit) {
    let uClass = this.cacheService.UnitClassCache.inCache(class_id);
    if (uClass) {
      if (uClass.canUseThisUnitClass(unit.classExperience)) {
        return uClass;
      }
    } else {
      console.log('clase no encontrada');
    }
    return null;
  }

  loadAllClassesInCache() {
    this.getAllClasses().then((x) => {
      x.forEach((element) => {
        this.cacheService.UnitClassCache.setInCache(element._id, element);
      });
    });
  }

  getPosiblesClasesUnit(experience: TupleClassExperience[]) {
    let ret: UnitClass[] = [];
    this.cacheService.UnitClassCache.cache.forEach((element) => {
      if (element.requiredClass.length === 0) {
        ret.push(element);
      } //cargo los que no piden nada
      else {
        if (element.canUseThisUnitClass(experience)) {
          ret.push(element);
        }
      }
    });

    return ret;
  }

  getPosiblesClassesIniciales() {
    let ret: UnitClass[] = [];

    this.cacheService.UnitClassCache.cache.forEach((element) => {
      if (element.requiredClass.length === 0) {
        ret.push(element);
      }
    });

    return ret;
  }
}
