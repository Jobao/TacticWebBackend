import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UnitInfoDocument = UnitInfo & Document;

@Schema({_id: false})
export class UnitInfo{

    @Prop()
    unitBase_uuid:string;

    @Prop()
    posX: number;

    @Prop()
    posY: number;

    @Prop()
    currentHP:number;

    @Prop()
    currentMP:number;

    @Prop()
    canPerformActionThisTurn:boolean

    @Prop()
    canMove:boolean

    @Prop()
    canAttack:boolean;

    ocupied(x:number, y:number): boolean{
        return x===this.posX && y === this.posY;
    }

    move(x:number, y:number): boolean{
        if(this.canMove){
            this.posX = x;
            this.posY = y;
            this.canMove = false;
            if(!this.canAttack){
                this.canPerformActionThisTurn = false;
            }
            return true;
        }
        return false;
    }

    attack(){
        if(this.canAttack){
            this.canAttack = false;
            if(!this.canMove){
                this.canPerformActionThisTurn = false;
            }
        }
    }

    newTurn(){
        this.canMove = true;
        this.canAttack = true;
    }

    prueba = function namess() {
        
    }

    wait(){
        this.canAttack = false;
        this.canMove = false;
        this.canPerformActionThisTurn = false;
    }
}
export const UnitInfoSchema = SchemaFactory.createForClass(UnitInfo);
UnitInfoSchema.loadClass(UnitInfo);