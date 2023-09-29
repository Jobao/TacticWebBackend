import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth{
    @Prop()
    _id:string;
    @Prop()
    uuid:string;

    @Prop()
    pass:string;
    
}

export const AuthSchema = SchemaFactory.createForClass(Auth);