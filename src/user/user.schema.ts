import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Unit } from 'src/game/schemas/unit.schema';
import { GetUserDto } from './dto/getUser.dto';

export type UserDocument = User & Document

@Schema()
export class User{
    
    @Prop({required:true})
    _id: string;
    
    @Prop({required:true})
    user: string;

    @Prop({required:true})
    displayName:string;

    @Prop([Unit])
    createdUnits:Unit[];

    toGetDto(){
        let ret:GetUserDto;
        ret._id = this._id;
        ret.createdUnits = this.createdUnits;
        ret.user = this.user;
        ret.displayName = this.displayName;
    }

    isMyUnit(unit_uuid:string){
        return this.getUnit(unit_uuid);
    }

    getUnit(unit_uuid:string){
        let unit:Unit;
        this.createdUnits.forEach(element => {
            if(element._id === unit_uuid){
                unit = element;
            }
        });
        return unit;
    }

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);
