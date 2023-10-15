import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { CacheService } from 'src/game-cache/cache.service';
import { ClassSkill, ClassSkillSchema } from 'src/game/schemas/classSkill.schema';
import { UnitClass, UnitClassSchema } from 'src/game/schemas/unitClass.schema';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
    imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}]),
            MongodbModule],
    providers:[UserGateway, UserService, CacheService]
})
export class UserModule {}
