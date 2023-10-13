import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from 'src/auth/auth.schema';
import { ClassSkill, ClassSkillDocument } from 'src/game/schemas/classSkill.schema';
import { Game, GameDocument } from 'src/game/schemas/game.schema';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class MongodbService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Auth.name) private authModel:Model<AuthDocument>,
    @InjectModel(ClassSkill.name) private classSkillModel:Model<ClassSkillDocument>){}

    async createGame(nGame:Game){
        return await this.gameModel.create(nGame);
    }

    async findGame(game_uuid:string){
        return await this.gameModel.findById(game_uuid).exec();
    }

    async updateGame(uGame:Game){
        return await this.gameModel.findByIdAndUpdate(uGame._id, uGame, {new: true}).exec();
    }

    async removeGame(game:Game){
        return await this.gameModel.findByIdAndRemove(game._id).exec();
    }

    /*------------------------USER------USER------USER--------------------------------*/


    async findUser(user_uuid:string){
        return await this.userModel.findById(user_uuid).exec();
    }

    async updateUser(user:User){
        
        return await this.userModel.findByIdAndUpdate(user._id, user, {new: true}).exec();
    }

    async createUser(user:User){
        return await this.userModel.create(user);
    }

    async getAllUsers(){
        return await this.userModel.find().exec();
    }

    //------------------------AUTH--------------------AUTH----------------AUTH-----

    async findAuth(user:string){
        return await this.authModel.findById(user).exec();
    }

    async createAuth(auth:Auth){
        await this.authModel.create(auth);
    }

    //-------------------------SKILLS---------------SKILLS-------------------SKILLS---------
    
    async createSkill(nSkill:ClassSkill){
        await this.classSkillModel.create(nSkill);
    }
}
