import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { RoomGateway } from './room/room.gateway';
import { GameGateway } from './game/game.gateway';
import { UserGateway } from './user/user.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, RoomGateway, GameGateway, UserGateway],
})
export class AppModule {}
