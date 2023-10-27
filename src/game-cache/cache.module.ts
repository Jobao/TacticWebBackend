import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports:[MongodbModule, MongooseModule],
  providers: [CacheService],
  exports:[ CacheService]
})
export class CacheModule {}
