import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


//TODO: ACA me quede, quiero ver la manera de hacer todo mas generico y evitar tanto codigo
//Hacer lo posible para pasar un MongoModel al cache
export class BaseMongoModel<X>{
constructor(private readonly model:Model<X>){}

    async create(doc: object){
        const createdEntity = new this.model(doc);
        const savedResult = await createdEntity.save();
        return createdEntity;
    }

    async findOne(uuid:string){
        return this.model.findById(uuid).exec();
    }

    async findAll(){
        return  await this.model.find().exec();
    }

    async update(uuid:string, doc:X){
        return await this.model.findByIdAndUpdate(uuid,doc, {new:true}).exec();
    }

    async remove(uuid:string){
        return await this.model.findByIdAndRemove(uuid).exec();
    }
}