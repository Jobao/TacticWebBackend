import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthHTTPGuard } from 'src/auth/authHTTP.guard';

@UseGuards(AuthHTTPGuard)
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/unit')
    sendNewUnit(@Body() payload: CreateUnitDto, @Req() req:Request){
        payload.user_uuid = req['user'].sub;
        return this.userService.addNewUnit(payload);
    }

}
