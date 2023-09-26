import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[],
    providers: [ChatGateway],
})
export class ChatModule {}
