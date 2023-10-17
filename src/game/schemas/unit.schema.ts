import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TupleRequiredClass, TupleRequiredClassSchema } from './requiredClass.schema';
import { TupleStats } from './stats.schema';
import { UnitClass } from './unitClass.schema';

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

    @Prop([TupleStats])
    stats:TupleStats[];

    changeClass(nClass:UnitClass){
        this.currentClassId = nClass._id;
        //calcular stats
    }

    increaseClassExperience(amount:number){
        this.classExperience.find(x =>{
            if(x._id ===this.currentClassId){
                x.experience+=amount;
            }
        })
    }
    
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.plugin(require('mongoose-autopopulate'));
UnitSchema.loadClass(Unit);