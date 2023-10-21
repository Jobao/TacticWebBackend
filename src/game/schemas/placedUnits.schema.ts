import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UnitInfo, UnitInfoSchema } from './unitInfo.schema';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PlacedUnitsDocument = PlacedUnit & Document;

@Schema({_id: false})
export class PlacedUnit{
    
    @ApiProperty()
    @Prop()
    user_uuid: string;

    @ApiProperty({type:()=> [UnitInfo]})
    @Prop({type: [UnitInfoSchema], autopopulate:true})
    unitInfo: UnitInfo[];

    
    isThisUnitPlace(unit_uuid: string): boolean{
        this.unitInfo.forEach(element => {
            if(element.unitBase_uuid == unit_uuid){
                return true;
            }
        });
        return false;
    }

     getUnit(unit_uuid:string){
        return this.unitInfo.find((element) => element.unitBase_uuid === unit_uuid)

    }
}

export const PlacedUnitSchema = SchemaFactory.createForClass(PlacedUnit);
PlacedUnitSchema.plugin(require('mongoose-autopopulate'));
PlacedUnitSchema.loadClass(PlacedUnit);