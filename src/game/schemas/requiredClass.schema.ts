import { Prop } from "@nestjs/mongoose";

export class RequiredClass{
    @Prop()
    classID:string;
    @Prop()
    experience:number;
}