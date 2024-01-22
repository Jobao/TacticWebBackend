import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TupleClassExperienceDocument = TupleClassPoints & Document;

export class TupleClassPoints {
  @Prop()
  classId: string;

  @Prop()
  currentPoints: number;

  @Prop()
  habilidadesDesbloquedas: string;
}
