import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
const bcrypt = require('bcrypt');

export type AuthDocument = Auth & Document;

@Schema()
export class Auth{
    @Prop({required: true})
    _id:string;
    @Prop({required: true})
    uuid:string;

    @Prop({required: true})
    pass:string;

    
    async checkPassword(pass:string):Promise<boolean>{
        return await bcrypt.compare(pass, this.pass);
    }
    
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.loadClass(Auth);

AuthSchema.pre('save', async function (next) {
    if(!this.isModified("pass")) return next();
    try{
        this.pass = await bcrypt.hash(this.pass, 10);
        return next();
    }
    catch(error){
        return next();
    }
    
});