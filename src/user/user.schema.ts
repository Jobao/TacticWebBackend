import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User{

    @Prop()
    user: string;

    @Prop()
    uuiid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
/*
export const UsertSchema =new  mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    uuiid:{
        type: String,
        required: false
    }
});

const UserT = mongoose.model('userT', UsertSchema);
*/