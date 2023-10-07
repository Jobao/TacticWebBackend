import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Public } from 'src/auth/public.decorator';
import { GameService } from 'src/game/game.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Public()
@Controller('admin')
export class AdminController {
    constructor(private userService:UserService, private authService:AuthService, private s:GameService){}

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



}