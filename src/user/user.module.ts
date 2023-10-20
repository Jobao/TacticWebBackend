import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { CacheService } from 'src/game-cache/cache.service';
import { ClassSkill, ClassSkillSchema } from 'src/skills/schema/classSkill.schema';
import { UnitClass, UnitClassSchema } from 'src/unit-clases/schema/unitClass.schema';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UnitClasesService } from 'src/unit-clases/unit-clases.service';
import { UserController } from './user.controller';

@Module({
    imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}]),
            MongodbModule],
    providers:[UserGateway, UserService, CacheService, UnitClasesService],
    exports:[UserService, UnitClasesService],
    controllers: [UserController]
})
export class UserModule {}
