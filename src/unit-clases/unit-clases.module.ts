import { Module } from '@nestjs/common';
import { UnitClasesService } from './unit-clases.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { CacheModule } from 'src/game-cache/cache.module';
import { UnitClasesController } from './unit-clases.controller';

@Module({
  imports:[MongodbModule, CacheModule],
  providers: [UnitClasesService],
  exports:[UnitClasesService],
  controllers: [UnitClasesController]
})
export class UnitClasesModule {}
