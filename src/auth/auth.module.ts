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

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{name: Auth.name , schema: AuthSchema},{name: User.name , schema: UserSchema}, {name: Game.name, schema: GameSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService, MongodbService],
  exports:[AuthService, UserService]
})
export class AuthModule {}


