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
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { CacheModule } from './game-cache/cache.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { SkillsModule } from './skills/skills.module';
import { UnitClasesModule } from './unit-clases/unit-clases.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/TacticWeb', {connectionFactory:(connection) =>{
    connection.plugin(require('mongoose-autopopulate')); 
    return connection;
  }}), ChatModule, UserModule, GameModule, AuthModule, AdminModule, CacheModule, MongodbModule, SkillsModule, UnitClasesModule],
  controllers: [AppController],
  providers: [AppService, RoomGateway,{provide: APP_GUARD,
    useClass: AuthGuard,}],
})
export class AppModule {}
