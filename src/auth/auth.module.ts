import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { ClassSkill, ClassSkillSchema } from 'src/skills/schema/classSkill.schema';
import { UnitClass, UnitClassSchema } from 'src/unit-clases/schema/unitClass.schema';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UserModule } from 'src/user/user.module';
import { CacheModule } from 'src/game-cache/cache.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}])
  ,MongodbModule, UserModule, CacheModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}


