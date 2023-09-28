import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UnitInfo } from './unitInfo.schema';

export type PlacedUnitsDocument = PlacedUnit & Document;

@Schema({_id: false})
export class PlacedUnit{
    
    @Prop()
    owner_id: string;

    @Prop([UnitInfo])
    unitInfo: UnitInfo[];
}

export const PlacedUnitSchema = SchemaFactory.createForClass(PlacedUnit);