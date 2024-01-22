import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  TupleAttribute,
  TupleAttributeSchema,
} from '../../game/schemas/attribute.schema';
import {
  TupleRequiredClass,
  TupleRequiredClassSchema,
} from '../../game/schemas/requiredClass.schema';
import { Document } from 'mongoose';

export type UnitClassDocument = UnitClass & Document;
@Schema()
export class UnitClass {
  @Prop()
  _id: string; //Es su nombre

  @Prop({ type: [TupleAttributeSchema], autopopulate: true })
  baseAttributes: TupleAttribute[];

  @Prop({ type: [TupleRequiredClassSchema], autopopulate: true })
  requiredClass: TupleRequiredClass[];

  @Prop()
  requiredExp: number[];

  canUseThisUnitClass(t: TupleRequiredClass[]) {
    let cant = this.requiredClass.length;

    //Por cada elemento requerido, tengo que ver si en T esta
    this.requiredClass.forEach((element) => {
      t.forEach((element2) => {
        if (element._id === element2._id) {
          if (element2.currentExperience >= element.currentExperience) {
            cant--;
          }
        }
      });
    });
    return cant === 0;
  }
}

export const UnitClassSchema = SchemaFactory.createForClass(UnitClass);
UnitClassSchema.plugin(require('mongoose-autopopulate'));
UnitClassSchema.loadClass(UnitClass);
