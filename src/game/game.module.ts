import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user';
import { UserSchema } from 'src/user/user.schema';

@Module({
    imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}])],
    providers:[GameGateway, GameService, UserService]
})
export class GameModule {

}
