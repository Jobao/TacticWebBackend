import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { TupleStatsSchema, TupleStats } from './stats.schema';
export type UnitInfoDocument = UnitInfo & Document;

@Schema({_id: false})
export class UnitInfo{

    @ApiProperty()
    @Prop()
    unitBase_uuid:string;

    @ApiProperty()
    @Prop()
    posX: number;

    @ApiProperty()
    @Prop()
    posY: number;

    @ApiProperty()
    @Prop()
    currentHP:number;

    @ApiProperty()
    @Prop()
    currentMP:number;

    @ApiProperty()
    @Prop()
    canPerformActionThisTurn:boolean

    @ApiProperty()
    @Prop()
    canMove:boolean

    @ApiProperty()
    @Prop()
    canAttack:boolean;

    @ApiProperty()
    @Prop({type:[TupleStatsSchema]})
    stats:TupleStats[];

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

    attack(attackedUnit:UnitInfo){
        if(this.canAttack){
            this.canAttack = false;
            attackedUnit.receiveDamage();
            if(!this.canMove){
                this.canPerformActionThisTurn = false;
            }
        }
    }

    newTurn(){
        this.canMove = true;
        this.canAttack = true;
    }

    wait(){
        this.canAttack = false;
        this.canMove = false;
        this.canPerformActionThisTurn = false;
    }

    receiveDamage(){
        this.currentHP -=10;
        if(this.currentHP <= 0){
            console.log("DEATH");
        }
    }
}
export const UnitInfoSchema = SchemaFactory.createForClass(UnitInfo);
UnitInfoSchema.loadClass(UnitInfo);