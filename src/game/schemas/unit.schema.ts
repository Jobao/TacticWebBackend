import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TupleRequiredClass, TupleRequiredClassSchema } from './requiredClass.schema';
import { TupleStats, TupleStatsSchema } from './stats.schema';
import { UnitClass } from './unitClass.schema';
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
    currentHP:number;

    @Prop()
    currentMP:number;

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
                    this.stats.push({statsName:StatsName.HP, amount: element.amount* 100})
                    break;
            case AttributesName.SPIRIT:
            case AttributesName.STRENGTH:
            case AttributesName.INTELLECT:
            case AttributesName.SPEED:
            case AttributesName.COINS:
            case AttributesName.DEXTERY:
                default:
                    break;
            }
        });
    }

    
    
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.plugin(require('mongoose-autopopulate'));
UnitSchema.loadClass(Unit);