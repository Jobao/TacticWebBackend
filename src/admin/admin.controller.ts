import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Public } from 'src/auth/public.decorator';
import { JoinGameDto } from 'src/game/dto/joinGame.dto';
import { PlaceUnitDto } from 'src/game/dto/placeUnit.dto';
import { GameService } from 'src/game/game.service';
import { SkillsService } from 'src/skills/skills.service';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Public()
@Controller('admin')
export class AdminController {
    constructor(private userService:UserService, 
        private authService:AuthService, 
        private gameService:GameService,
        private skillService: SkillsService){}

    @Post('/user')
    addNewUser(@Body() nUser:SignupDto){
        this.authService.signup(nUser)
    }

    @Get('/user')
    getAllUser(){
        return this.userService.findAll();
    }

    @Post('/user/:id')
    updateUser(@Body() uUser:User){
        return this.userService.update(uUser);
    }

    @Get('/games/:id')
    getGame(@Param('id') game_uuid:string){
        return this.gameService.getGame(game_uuid);
    }

    @Post('/games/leave')
    leaveGame(@Body() dto:JoinGameDto){
        this.gameService.leaveGame(dto);
        //TODO:Quien es el encargado de abandonar la partida
        //return this.ga.s.getGame(game_uuid.id);
    }

    @Post('/user/:id/unit')
    placeUnit(@Param('id') user_uuid:any, @Body() payload:CreateUnitDto){
        payload.user_uuid = user_uuid;
        this.userService.addNewUnit(payload);
    }

    @Post('skills')
    newSkill(){
        this.skillService.create();
    }

    



}