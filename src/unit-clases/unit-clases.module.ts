import { Module } from '@nestjs/common';
import { UnitClasesService } from './unit-clases.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { CacheService } from 'src/game-cache/cache.service';

@Module({
  imports:[MongodbModule],
  providers: [UnitClasesService, MongodbService, CacheService]
})
export class UnitClasesModule {}
