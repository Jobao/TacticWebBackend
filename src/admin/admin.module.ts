import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
import { GameModule } from 'src/game/game.module';

@Module({
  imports:[AuthModule, UserModule, GameModule],
  controllers: [AdminController],
  providers:[]
})
export class AdminModule {}
