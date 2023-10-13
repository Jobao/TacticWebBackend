import { Injectable } from '@nestjs/common';
import { UnitClass } from 'src/game/schemas/unitClass.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class UnitClasesService {
    constructor(private mongooseService:MongodbService){}

    addNewClass(nClass:UnitClass){
        this.mongooseService.createUnitClass(nClass);
    }
}
