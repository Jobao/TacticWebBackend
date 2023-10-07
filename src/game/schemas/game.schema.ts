import { Board } from "./board.schema";
import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { PlacedUnit, PlacedUnitSchema } from "./placedUnits.schema";
import { UnitInfo } from "./unitInfo.schema";
import { HydratedDocument, Document } from "mongoose";
import { Unit } from "./unit.schema";

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

    @Prop()
    isEnd:boolean;

    @Prop()
    isStart:boolean;

    @Prop()
    minUnits:number;

    @Prop()
    maxUnits:number;
    
    @Prop()
    owner_uuid:string;

    @Prop()
    turn:string;

    @Prop()
    gamePhase: number;

    isInsideBoard(x:number, y:number){
        return((x >=0 && x< this.sizeX) &&(y >=0 && y< this.sizeY))
    }

    isOcupiedByAnotherUnit(x:number, y:number){
        let res= false;
        for (let index = 0; index < this.placedUnitList.length; index++) {
            const element = this.placedUnitList[index];
            element.unitInfo.forEach(element2 => {
                if(x===element2.posX && y === element2.posY){
                    res = true;
                }
            });
            
        }
        return res;
    }

    getUserIndexOnPlacedUnitList(user_uuid:string): number {
        for (let userIndex = 0; userIndex < this.placedUnitList.length; userIndex++) {
            if(this.placedUnitList[userIndex].user_uuid === user_uuid){
                return userIndex;
            }
        }
        return -1;
    }

    /*getUserIndexOnListUsers(user_uuid:string): number {
        for (let userIndex = 0; userIndex < this.users_uuid.length; userIndex++) {
            if(this.users_uuid[userIndex] === user_uuid){
                return userIndex;
            }
        }
        return -1;
    }*/

    placeNewUnit(user_uuid:string, unit_uuid:string, x:number, y:number, hp:number, mp:number){
        let idx= this.getUserIndexOnPlacedUnitList(user_uuid);
        if(idx !== -1){
            let temp:UnitInfo = new UnitInfo();
            temp.unitBase_uuid = unit_uuid;
            temp.posX = x;
            temp.posY=y
            temp.currentHP = hp;
            temp.currentMP = mp;
            temp.canPerformActionThisTurn = true;
            this.placedUnitList[idx].unitInfo.push(temp);
            return true;
        }
        return false;

    }

    isMyTurn(uuid:string):boolean{
        return this.turn===uuid;
    }

    isThisUnitPlace(unit_uuid:string, user_uuid:string){
        let index = this.getUserIndexOnPlacedUnitList(user_uuid);
        let result = false;
        if(index >=0){
            this.placedUnitList[index].unitInfo.forEach(element => {
                
                if(element.unitBase_uuid === unit_uuid){
                    result = true;
                }//TODO: al estar repetida terminar el bucle
            });
        }
        return result;
    }

    moveUnit(unit_uuid:string, user_uuid:string, x:number, y:number){
        let index = this.getUserIndexOnPlacedUnitList(user_uuid);
        let result = false;
        if(index >=0){
            this.placedUnitList[index].unitInfo.forEach(element => {
                if(element.unitBase_uuid === unit_uuid){
                    element.posX = x;
                    element.posY = y;
                    result = true;
                }
            });
        }
        return result;
    }

    joinGame(user_uuid:string):boolean{
        if(this.getUserIndexOnPlacedUnitList(user_uuid) === -1){
            //this.users_uuid.push(user_uuid);
            let place: PlacedUnit = new PlacedUnit(); //Esto porque no me dejaba hacer ...push({element.uuid ....}) directamente
            place.user_uuid = user_uuid;
            place.unitInfo = [];
            this.placedUnitList.push(place);
            return true;
        }
        return false;
    }

    leaveGame(user_uuid:string){
       let index = this.getUserIndexOnPlacedUnitList(user_uuid);
       if(index !== -1){
        this.placedUnitList.splice(index, 1);
       }
       return this.placedUnitList.length;
    }

    isOwner(user_uuid:string): boolean{
        return(user_uuid === this.owner_uuid);
    }

    canPlaceMoreUnit(user_uuid:string){
        let index = this.getUserIndexOnPlacedUnitList(user_uuid);
        if(index !== -1){
            return ((this.placedUnitList[index].unitInfo.length < this.maxUnits))
        }
        return false;
    }

    canRemoveUnit(user_uuid:string){
        let index = this.getUserIndexOnPlacedUnitList(user_uuid);
        if(index !== -1){
            return ((this.placedUnitList[index].unitInfo.length >= 1))
        }
        return false;
    }

}

export const GameSchema = SchemaFactory.createForClass(Game);
GameSchema.loadClass(Game); //https://github.com/nestjs/mongoose/issues/408#issuecomment-917179516


