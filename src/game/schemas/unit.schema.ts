import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TupleRequiredClass, TupleRequiredClassSchema } from './requiredClass.schema';
import { TupleStats, TupleStatsSchema } from './stats.schema';
import { UnitClass } from '../../unit-clases/schema/unitClass.schema';
import { AttributesName, StatsName } from './enums';
import { UnitEquiped } from './unitEquiped.schema';

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
    battleActions:string;

    @Prop({type:[TupleRequiredClassSchema], autopopulate:true})
    classExperience:TupleRequiredClass[]

    @Prop({type:[TupleStatsSchema], autopopulate:true})
    stats:TupleStats[];

    @Prop(UnitEquiped)
    equipment:UnitEquiped

    changeClass(nClass:UnitClass){
        if (this.currentClassId !==nClass._id) {
            this.currentClassId = nClass._id;
            if(!this.tupleActual()){
                let tpRC = new TupleRequiredClass();
                tpRC._id = nClass._id;
                tpRC.experience = 0;
                this.classExperience.push(tpRC);
            }
            this.calculeStats(nClass);
            return true;
        }
        return false;
        
    }

    increaseClassExperience(amount:number){
        let tp = this.tupleActual();
        if(tp){
            tp.addExperience(amount);
            //TODO: COntrolar si sube de nivel
        }
        //MAYBE: si no existe deberia crear nuevos tuples ???????
        
    }

    tupleActual(){
        return this.classExperience.find(x =>{return x._id ===this.currentClassId})
    }


    calculeStats(nClass:UnitClass){
       this.stats = []
        nClass.baseAttributes.forEach(element => {
            switch (element.attributeName) {
                case AttributesName.STAMINA:
                    this.stats.push({statsName:StatsName.HP, amount: element.amount* 10})
                    break;
                case AttributesName.SPIRIT:
                    this.stats.push({statsName: StatsName.MP, amount: element.amount * 7})
                    this.stats.push({statsName: StatsName.MPRegen, amount: element.amount * 2})
                    break;
                case AttributesName.STRENGTH:
                    this.stats.push({statsName:StatsName.PA, amount: element.amount * 6});
                    this.stats.push({statsName:StatsName.PhysicDefense, amount: element.amount * 2})
                    break;

                case AttributesName.INTELLECT:
                    this.stats.push({statsName:StatsName.MA, amount: element.amount * 6})
                    this.stats.push({statsName:StatsName.MagicalDefence, amount: element.amount * 2})
                    break;
            case AttributesName.AGILITY:
                this.stats.push({statsName:StatsName.Dodge, amount: element.amount * 2});
                this.stats.push({statsName: StatsName.Speed, amount:element.amount * 10})
                break;
                default:
                    break;
            }
        });
    }

    getStats(sta:StatsName){
        let result:number;
        this.stats.forEach(element => {
            if(element.statsName === sta){
                result = element.amount;
            }
        });
        return result;
    }

    
    
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.plugin(require('mongoose-autopopulate'));
UnitSchema.loadClass(Unit);