import { Prop } from '@nestjs/mongoose';
import { TupleStats } from './stats.schema';

export class Cost {
  @Prop()
  amount: number;
  @Prop()
  resource: TupleStats;
}
