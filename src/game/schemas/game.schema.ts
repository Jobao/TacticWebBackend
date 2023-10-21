import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { PlacedUnit, PlacedUnitSchema} from "./placedUnits.schema";
import { UnitInfo } from "./unitInfo.schema";
import { Document } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Target } from 'src/unit/dto/unitAction.dto';
import { Unit } from './unit.schema';
import { StatsName } from './enums';

export type GameDocument = Game & Document;

@Schema()
export class Game{
    @ApiProperty()
    @Prop()
    _id: string;

    @ApiProperty()
    @Prop()
    sizeX: number;//size del tablero horizontal

    @ApiProperty()
    @Prop()
    sizeY:number;//size del tablero vertical

    @ApiProperty({type: ()=> [PlacedUnit]})
    @Prop({type: [PlacedUnitSchema], autopopulate:true})
    placedUnitList: PlacedUnit[];

    @ApiProperty()
    @Prop()
    isEnd:boolean;

    @ApiProperty()
    @Prop()
    isStart:boolean;

    @ApiProperty()
    @Prop()
    minUnits:number;

    @ApiProperty()
    @Prop()
    maxUnits:number;
    
    @ApiProperty()
    @Prop()
    owner_uuid:string;

    @ApiProperty()
    @Prop()
    turn:string;
    @ApiProperty()
    @Prop()
    gamePhase: string;

    isInsideBoard(target:Target){
        return((target.x >=0 && target.x< this.sizeX) &&(target.y >=0 && target.y< this.sizeY))
    }

    isOcupiedByAnotherUnit(target:Target){
        //let res= false;
        let unit:UnitInfo;
        for (let index = 0; index < this.placedUnitList.length; index++) {
            const element = this.placedUnitList[index];
            element.unitInfo.forEach(element2 => {
                if(target.x===element2.posX && target.y === element2.posY){
                    //res = true;
                    unit = element2;
                }
            });
            
        }
        return unit;
    }

    getUserIndexOnPlacedUnitList(user_uuid:string): number {
        for (let userIndex = 0; userIndex < this.placedUnitList.length; userIndex++) {
            if(this.placedUnitList[userIndex].user_uuid === user_uuid){
                return userIndex;
            }
        }
        return -1;
    }

    getPlacedUnit(user_uuid:string, unit_uuid:string){
        
        let idx= this.getUserIndexOnPlacedUnitList(user_uuid);
        if(idx !== -1){
            return  this.placedUnitList[idx].getUnit(unit_uuid);
        }
    }

    placeNewUnit(user_uuid:string, unit:Unit, target:Target){
        let idx= this.getUserIndexOnPlacedUnitList(user_uuid);
        if(idx !== -1){
            let temp:UnitInfo = new UnitInfo();
            temp.unitBase_uuid = unit._id;
            temp.posX = target.x;
            temp.posY=target.y;
            temp.currentHP = unit.getStats(StatsName.HP);
            temp.currentMP = unit.getStats(StatsName.MP);
            temp.stats = unit.stats;
            temp.canPerformActionThisTurn = true;
            temp.canMove = true;
            temp.canAttack = true;
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

    getUnit(user_uuid:string, unit_uuid:string){
        let index = this.getUserIndexOnPlacedUnitList(user_uuid);
        let unit:UnitInfo;
        if(index !== -1){
            return this.placedUnitList[index].getUnit(unit_uuid);
            //unit = this.placedUnitList[index].unitInfo.find((element) =>element.unitBase_uuid === unit_uuid);
            
        }
        return unit;
    }

    getUnitOnPos(x:number, y:number){
        let p:UnitInfo;
        this.placedUnitList.forEach(element => {
            element.unitInfo.forEach(uInfo => {
                if (uInfo.ocupied(x, y)) {
                    p = uInfo;
                }
                
            });
        });
        return p;
    }

}

export const GameSchema = SchemaFactory.createForClass(Game);
GameSchema.plugin(require('mongoose-autopopulate'));
GameSchema.loadClass(Game); //https://github.com/nestjs/mongoose/issues/408#issuecomment-917179516


