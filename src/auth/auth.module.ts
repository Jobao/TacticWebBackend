import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { CacheService } from 'src/game-cache/cache.service';
import { ClassSkill, ClassSkillSchema } from 'src/game/schemas/classSkill.schema';
import { UnitClass, UnitClassSchema } from 'src/game/schemas/unitClass.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService, MongodbService, CacheService],
  exports:[AuthService, UserService]
})
export class AuthModule {}


