import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PieceDocument = Piece & Document;

@Schema({_id: false})
export class Piece{
    @Prop()
    name: string;
}

export const PieceSchema = SchemaFactory.createForClass(Piece);