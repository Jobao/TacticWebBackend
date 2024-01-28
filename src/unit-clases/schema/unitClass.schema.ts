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
import { TupleClassExperience } from 'src/game/schemas/classExperience.schema';

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
  requiredExpToLevelUp: number[];

  canUseThisUnitClass(t: TupleClassExperience[]) {
    if (t.length > 0) {
      let cant = this.requiredClass.length;

      //Por cada elemento requerido, tengo que ver si en T esta
      this.requiredClass.forEach((element) => {
        t.forEach((element2) => {
          if (element._id === element2._id) {
            if (element2.currentClassLevel >= element.requiredLevel) {
              cant--;
            }
          }
        });
      });
      return cant === 0;
    } else {
      return false;
    }
  }
}

export const UnitClassSchema = SchemaFactory.createForClass(UnitClass);
UnitClassSchema.plugin(require('mongoose-autopopulate'));
UnitClassSchema.loadClass(UnitClass);
