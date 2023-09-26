import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomGateway } from './room/room.gateway';
import { GameGateway } from './game/game.gateway';
import { UserGateway } from './user/user.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/TacticWeb'), ChatModule, UserModule],
  controllers: [AppController],
  providers: [AppService, RoomGateway, GameGateway],
})
export class AppModule {}
