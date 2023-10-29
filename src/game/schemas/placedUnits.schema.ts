import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GameUnit, GameUnitSchema } from './gameUnit.schema';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PlacedUnitsDocument = PlacedUnit & Document;

@Schema({_id: false})
export class PlacedUnit{
    
    @ApiProperty()
    @Prop()
    user_uuid: string;

    @ApiProperty({type:()=> [GameUnit]})
    @Prop({type: [GameUnitSchema], autopopulate:true})
    gameUnit: GameUnit[];

    
    isThisUnitPlace(unit_uuid: string): boolean{
        this.gameUnit.forEach(element => {
            if(element.unitBase_uuid == unit_uuid){
                return true;
            }
        });
        return false;
    }

     getUnit(unit_uuid:string){
        return this.gameUnit.find((element) => element.unitBase_uuid === unit_uuid)

    }
}

export const PlacedUnitSchema = SchemaFactory.createForClass(PlacedUnit);
PlacedUnitSchema.plugin(require('mongoose-autopopulate'));
PlacedUnitSchema.loadClass(PlacedUnit);