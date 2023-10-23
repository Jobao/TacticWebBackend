import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { ClassSkill, ClassSkillSchema } from 'src/skills/schema/classSkill.schema';
import { UnitClass, UnitClassSchema } from 'src/unit-clases/schema/unitClass.schema';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UserController } from './user.controller';
import { UnitClasesModule } from 'src/unit-clases/unit-clases.module';
import { CacheModule } from 'src/game-cache/cache.module';

@Module({
    imports:[MongooseModule.forFeature([{name: Game.name, schema: GameSchema}, {name: User.name, schema: UserSchema}, {name: Auth.name , schema: AuthSchema}, {name: ClassSkill.name , schema: ClassSkillSchema},{name: UnitClass.name , schema: UnitClassSchema}]),
            MongodbModule, UnitClasesModule, CacheModule],
    providers:[UserGateway, UserService],
    exports:[UserService],
    controllers: [UserController]
})
export class UserModule {}
