import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { ClassSkill, ClassSkillSchema } from 'src/game/schemas/classSkill.schema';
import { UnitClass, UnitClassSchema } from 'src/game/schemas/unitClass.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}])],
  providers: [CacheService,  MongodbService],
  exports:[CacheService, MongodbService]
})
export class CacheModule {}
