import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { User, UserSchema } from 'src/user/user.schema';
import { CacheService } from 'src/game-cache/cache.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { ClassSkill, ClassSkillSchema } from './schemas/classSkill.schema';
import { UnitClass, UnitClassSchema } from './schemas/unitClass.schema';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
    imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}]),
            MongodbModule],
    providers:[GameGateway,GameService, MongodbService, CacheService],
    exports:[GameService]
})
export class GameModule {

}
