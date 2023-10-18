import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/game-cache/cache.service';
import { Unit } from 'src/game/schemas/unit.schema';
import { UnitClass } from 'src/game/schemas/unitClass.schema';
import { UnitClassMongoRepository } from 'src/mongodb/repositories/unitClassMongoRepository';

@Injectable()
export class UnitClasesService {
    constructor(private mongooseService:UnitClassMongoRepository, private cacheService:CacheService){
        this.loadAllClassesInCache();
    }

    addNewClass(nClass:UnitClass){
        this.mongooseService.create(nClass);
    }

    getAllClasses(){
        return this.mongooseService.findAll();
    }
    /**
     * si puede usar la clase, la devuleve, sino NULL
     * @param class_id 
     * @param unit 
     * @returns 
     */
    canUseThisClass(class_id:string, unit:Unit){
        let uClass =this.cacheService.UnitClassCache.inCache(class_id);
        if (uClass) {
            if(uClass.canUseThisUnitClass(unit.classExperience)){
                return uClass;
            }
        }
        return null;
    }

    loadAllClassesInCache(){
        this.getAllClasses().then((x) =>{
            x.forEach(element => {
                this.cacheService.UnitClassCache.setInCache(element._id, element);
            });
        });
    }

    getPosiblesClasesUnit(unit:Unit){
        let ret:UnitClass[]=[];
        this.cacheService.UnitClassCache.cache.forEach((element) =>{
            
            if(element.requiredClass.length === 0){
                ret.push(element);
            }//cargo los que no piden nada
            else{
                if(element.canUseThisUnitClass(unit.classExperience)){
                    ret.push(element);
                }
            }
        });

        return ret;
    }
}
