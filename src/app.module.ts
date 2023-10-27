import { Module } from '@nestjs/common';
import { RoomGateway } from './room/room.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CacheModule } from './game-cache/cache.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { SkillsModule } from './skills/skills.module';
import { UnitClasesModule } from './unit-clases/unit-clases.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/TacticWeb', {connectionFactory:(connection) =>{
    connection.plugin(require('mongoose-autopopulate')); 
    return connection;
  }}), ChatModule, UserModule, GameModule, AuthModule, AdminModule, CacheModule, MongodbModule, SkillsModule, UnitClasesModule, ItemModule],
  controllers: [],
  providers: [RoomGateway,],
})
export class AppModule {}


/*{provide: APP_GUARD,
    useClass: AuthGuardGateway,},{provide: APP_GUARD,
      useClass: AuthGuardHTTP,}*/