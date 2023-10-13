import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { ClassSkill, ClassSkillSchema } from 'src/game/schemas/classSkill.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema}])],
  providers: [MongodbService],
  exports:[MongooseModule]
})
export class MongodbModule {}
