import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { ClassSkill, ClassSkillSchema } from 'src/game/schemas/classSkill.schema';
import { UnitClass, UnitClassSchema } from 'src/game/schemas/unitClass.schema';
import { GameMongoModel } from './gameMongoModel';
import { UserMongoModel } from './userMongoModel';
import { UnitClassMongoModel } from './unitClassMongoModel';

@Module({
  imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}])],
  providers: [MongodbService,GameMongoModel, UserMongoModel, UnitClassMongoModel],
  exports:[MongooseModule,GameMongoModel, UserMongoModel,MongodbService,UnitClassMongoModel]
})
export class MongodbModule {}
