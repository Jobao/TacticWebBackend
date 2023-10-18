import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TupleRequiredClass, TupleRequiredClassSchema } from './requiredClass.schema';
import { TupleStats, TupleStatsSchema } from './stats.schema';
import { UnitClass } from './unitClass.schema';
import { AttributesName, StatsName } from './enums';

export type UnitDocument = Unit & Document;

@Schema()
export class Unit{
    @Prop()
    _id:string;

    @Prop()
    name:string;

    @Prop()
    currentClassId:string;

    @Prop()
    currentHP:number;

    @Prop()
    currentMP:number;

    @Prop()
    battleActions:string;

    @Prop({type:[TupleRequiredClassSchema], autopopulate:true})
    classExperience:TupleRequiredClass[]

    @Prop({type:[TupleStatsSchema], autopopulate:true})
    stats:TupleStats[];

    changeClass(nClass:UnitClass){
        if (this.currentClassId !==nClass._id) {
            this.currentClassId = nClass._id;
            this.calculeStats(nClass);
            return true;
        }
        return false;
        
    }

    increaseClassExperience(amount:number){
        this.classExperience.find(x =>{
            if(x._id ===this.currentClassId){
                x.experience+=amount;
                //TODO: calcular si subio de nivel
            }
        })
    }


    calculeStats(nClass:UnitClass){
       this.stats = []
        nClass.baseAttributes.forEach(element => {
            switch (element.attributeName) {
                case AttributesName.STAMINA:
                    this.stats.push({statsName:StatsName.HP, amount: element.amount* 100})
                    break;
            
                default:
                    break;
            }
        });
    }
    
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.plugin(require('mongoose-autopopulate'));
UnitSchema.loadClass(Unit);