import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Unit, UnitSchema } from 'src/game/schemas/unit.schema';
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

    @Prop({type:[UnitSchema], autopopulate:true})
    createdUnits:Unit[];

    @Prop()
    gameJoinedList:string[];

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

    addUnit(unit:Unit){
        this.createdUnits.push(unit);
    }

    removeUnit(unit_uuid:string){
        let index =this.createdUnits.findIndex((x)=>{return x._id ===unit_uuid});
        if(index >= 0){
            this.createdUnits.splice(index, 1);
            return true;
        }
        return false;
    }

    joinGame(game_uuid:string){
        if(!this.gameJoinedList.includes(game_uuid)){
            this.gameJoinedList.push(game_uuid);
            
            return true;
        }
        return false;
    }

    leaveGame(game_uuid:string){
        let idx =this.gameJoinedList.indexOf(game_uuid);
        if(idx !== -1){
            this.gameJoinedList.splice(idx,1);
        }
    }

    leaveAllGames(){
        let tmp = this.gameJoinedList;
        this.gameJoinedList = [];
        return tmp;
    }

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(require('mongoose-autopopulate'));
UserSchema.loadClass(User);
