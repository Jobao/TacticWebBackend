import { Injectable } from '@nestjs/common';
import { ClassSkill } from 'src/game/schemas/classSkill.schema';
import { Cost } from 'src/game/schemas/cost.schema';
import { AttributesName, StatsName, TypeAffect, TypeEffect } from 'src/game/schemas/enums';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class SkillsService {
    constructor(private mongooseService:MongodbService){}

    async create(){
        let nSkill = new ClassSkill();
        nSkill._id = "";
        nSkill.cost = {statsName: StatsName.HP, amount:15};
        nSkill.effectList = [{stats:{statsName: StatsName.HP, amount:15}, typeEffect: TypeEffect.Damage, turn:0, unitAffect: TypeAffect.Target}];
        nSkill.name= "FireBall";
        nSkill.range = 6;
        nSkill.requiredLvl = 0;
        await this.mongooseService.createSkill(nSkill);
    }

}
