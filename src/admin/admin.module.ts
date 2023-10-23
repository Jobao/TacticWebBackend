import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { GameModule } from 'src/game/game.module';
import { SkillsModule } from 'src/skills/skills.module';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { UnitClasesModule } from 'src/unit-clases/unit-clases.module';
import { CacheModule } from 'src/game-cache/cache.module';

@Module({
  imports:[AuthModule, UserModule, GameModule, MongodbModule, UnitClasesModule, SkillsModule, CacheModule],
  controllers: [AdminController]
})
export class AdminModule {}
