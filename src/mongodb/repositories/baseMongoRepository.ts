import { Model } from "mongoose";

export class BaseMongoRepository<X>{
constructor(private readonly model:Model<X>){}

    async create(doc: object){
        try {
            return await this.model.create(doc);;
        } catch (error) {
            throw error;
            
        }
    }

    async findOne(uuid:string){
        try {
            return this.model.findById(uuid).exec();
        } catch (error) {
            
        }
    }

    async findAll(){
        try {
            return  await this.model.find().exec();
        } catch (error) {
            
        }
    }

    async update(uuid:string, doc:X){
        try {
            return await this.model.findByIdAndUpdate(uuid,doc, {new:true}).exec();
        } catch (error) {
            
        }
    }

    async remove(uuid:string){
        try {
            return await this.model.findByIdAndRemove(uuid).exec();
        } catch (error) {
            
        }
    }

    async CLEAN_ALL_COLLECTION_ATTENTION_010101010(){
        try {
            await this.model.deleteMany({});
        } catch (error) {
            
        }
    }
}