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
import configuration from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
//mongodb+srv://tacticprueba-main-db-014622f406f:37hz4TfrMhYfRtHJb5BSwe37912KD5@prod-us-central1-3.yr9so.mongodb.net/tacticprueba-main-db-014622f406f
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(
      process.env.uri,
      //process.env.MONGO_URI + '/' + process.env.MONGO_DB_NAME,
      {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));

          return connection;
        },
      },
    ),
    ChatModule,
    UserModule,
    GameModule,
    AuthModule,
    AdminModule,
    CacheModule,
    MongodbModule,
    SkillsModule,
    UnitClasesModule,
    ItemModule,
  ],
  controllers: [],
  providers: [RoomGateway],
})
export class AppModule {}

/*{provide: APP_GUARD,
    useClass: AuthGuardGateway,},{provide: APP_GUARD,
      useClass: AuthGuardHTTP,}*/
