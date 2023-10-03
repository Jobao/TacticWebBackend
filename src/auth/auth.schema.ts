import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth{
    @Prop({required: true})
    _id:string;
    @Prop({required: true})
    uuid:string;

    @Prop({required: true})
    pass:string;

    checkPassword(pass:string):boolean{
        return pass===this.pass;
    }
    
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.loadClass(Auth);