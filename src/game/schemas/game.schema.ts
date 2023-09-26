import { User } from "src/user/user";
import { Board } from "./board.schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game{
    @Prop()
    _id: string;

    @Prop(Board)
    board: Board;

    @Prop([String])
    users_uuid: string[];

    @Prop()
    isEnd:boolean;

    @Prop()
    isStart:boolean;
    
    @Prop()
    owner_uuid:string;
}

export const GameSchema = SchemaFactory.createForClass(Game);