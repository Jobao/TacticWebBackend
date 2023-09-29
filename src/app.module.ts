import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomGateway } from './room/room.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/TacticWeb'), ChatModule, UserModule, GameModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, RoomGateway,{provide: APP_GUARD,
    useClass: AuthGuard,}],
})
export class AppModule {}
