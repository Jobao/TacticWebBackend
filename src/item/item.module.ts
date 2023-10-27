import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { CacheModule } from 'src/game-cache/cache.module';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports:[ CacheModule,MongodbModule],
  controllers: [ItemController,],
  providers: [ItemService],
  exports:[ItemService]
})
export class ItemModule {}
