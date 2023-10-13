import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { GameModule } from 'src/game/game.module';
import { SkillsModule } from 'src/skills/skills.module';
import { SkillsService } from 'src/skills/skills.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Module({
  imports:[AuthModule, UserModule, GameModule, MongodbModule],
  controllers: [AdminController],
  providers:[SkillsService, MongodbService]
})
export class AdminModule {}
