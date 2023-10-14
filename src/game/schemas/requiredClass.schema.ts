import { Prop } from "@nestjs/mongoose";

export class TupleRequiredClass{
    @Prop()
    classID:string;
    @Prop()
    experience:number;
}