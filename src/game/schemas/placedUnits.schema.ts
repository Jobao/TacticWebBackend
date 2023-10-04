import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UnitInfo } from './unitInfo.schema';
import { Document } from 'mongoose';

export type PlacedUnitsDocument = PlacedUnit & Document;

@Schema({_id: false})
export class PlacedUnit{
    
    @Prop()
    user_uuid: string;

    @Prop([UnitInfo])
    unitInfo: UnitInfo[];

    isThisUnitPlace(unit_uuid: string): boolean{
        this.unitInfo.forEach(element => {
            if(element.unitBase_uuid == unit_uuid){
                return true;
            }
        });
        return false;
    }
}

export const PlacedUnitSchema = SchemaFactory.createForClass(PlacedUnit);
PlacedUnitSchema.loadClass(PlacedUnit);