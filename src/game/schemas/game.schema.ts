import { User } from "src/user/user";
import { Board } from "./board.schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlacedUnit, PlacedUnitSchema } from "./placedUnits.schema";

export type GameDocument = Game & Document;

@Schema()
export class Game{
    @Prop()
    _id: string;

    @Prop(Board)
    board: Board;//Por ahora queda

    @Prop()
    sizeX: number;//size del tablero horizontal

    @Prop()
    sizeY:number;//size del tablero vertical

    @Prop([PlacedUnit])
    placedUnitList: PlacedUnit[];

    @Prop([String])
    users_uuid: string[];

    @Prop()
    isEnd:boolean;

    @Prop()
    isStart:boolean;
    
    @Prop()
    owner_uuid:string;

    @Prop()
    turn:string;

    @Prop()
    gamePhase: number;

    getIndexUnits(uuid:string): number {
        for (let index = 0; index < this.placedUnitList.length; index++) {
            if(this.placedUnitList[index].owner_id === uuid){
                return index;
            }
        }
        return -1;
    }

    addNewPiece(user_uuid:string, idUnit:string){
        let idx= this.getIndexUnits(user_uuid);
        if(idx !== -1){
            //this.unitList[idx].unitInfo.push()
        }

    }

    isMyTurn(uuid:string):boolean{
        return this.turn===uuid;
    }
}

export const GameSchema = SchemaFactory.createForClass(Game);