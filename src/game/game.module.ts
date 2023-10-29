import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { GameController } from './game.controller';
import { CacheModule } from 'src/game-cache/cache.module';
import { ItemModule } from 'src/item/item.module';

@Module({
    imports:[MongodbModule, CacheModule, MongooseModule, ItemModule],
    providers:[GameGateway,GameService],
    exports:[GameService],
    controllers: [GameController]
})
export class GameModule {

}
