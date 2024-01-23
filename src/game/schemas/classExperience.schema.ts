import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TupleRequiredClass } from './requiredClass.schema';
import { UnitClass } from 'src/unit-clases/schema/unitClass.schema';

export type TupleClassExperienceDocument = TupleClassExperience & Document;

@Schema({ id: false })
export class TupleClassExperience {
  @Prop()
  _id: string;
  @Prop()
  currentExperience: number;
  @Prop()
  currentClassLevel: number;

  @Prop()
  currentPoints: number;

  @Prop()
  habilidadesDesbloquedas: [];

  addExperience(amount: number) {
    this.currentExperience += amount;
  }
}

export const TupleClassExperienceSchema =
  SchemaFactory.createForClass(TupleClassExperience);
TupleClassExperienceSchema.loadClass(TupleClassExperience);
