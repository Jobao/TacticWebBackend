import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Unit } from 'src/game/schemas/unit.schema';

export type UserDocument = User & Document

@Schema()
export class User{
    
    @Prop({required:true})
    _id: string;
    
    @Prop({required:true})
    user: string;

    @Prop([Unit])
    createdUnits:Unit[];

}

export const UserSchema = SchemaFactory.createForClass(User);
