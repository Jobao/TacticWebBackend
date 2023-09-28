import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User{
    
    @Prop({required:true})
    _id: string;
    
    @Prop({required:true})
    user: string;

    @Prop()
    createdUnits:string;

}

export const UserSchema = SchemaFactory.createForClass(User);
