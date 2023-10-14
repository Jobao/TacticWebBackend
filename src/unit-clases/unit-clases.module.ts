import { Module } from '@nestjs/common';
import { UnitClasesService } from './unit-clases.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports:[MongodbModule],
  providers: [UnitClasesService, MongodbService]
})
export class UnitClasesModule {}