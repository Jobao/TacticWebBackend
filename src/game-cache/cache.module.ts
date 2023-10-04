import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { GameService } from 'src/game/game.service';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Module({
  imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}])],
  providers: [CacheService,  MongodbService]
})
export class CacheModule {}
