import { Module } from '@nestjs/common';
import { UnitClasesService } from './unit-clases.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { CacheModule } from 'src/game-cache/cache.module';

@Module({
  imports:[MongodbModule, CacheModule],
  providers: [UnitClasesService],
  exports:[UnitClasesService]
})
export class UnitClasesModule {}
