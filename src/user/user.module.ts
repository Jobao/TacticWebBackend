import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports:[MongooseModule.forFeature([{name: User.name , schema: UserSchema}])],
    providers:[UserGateway, UserService]
})
export class UserModule {}
