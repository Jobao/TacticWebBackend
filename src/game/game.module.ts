import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';
import { CacheService } from 'src/game-cache/cache.service';
import { CacheModule } from 'src/game-cache/cache.module';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Module({
    imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}])],
    providers:[GameGateway,GameService, MongodbService, CacheService],
    exports:[GameService]
})
export class GameModule {

}
