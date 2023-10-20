import { Body, Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { AuthHTTPGuard } from 'src/auth/authHTTP.guard';
import { CreateGameDto } from './dto/createGame.dto';
import { GameService } from './game.service';
import { GameANDUserDTO } from './dto/gameUser.dto';
import { PlaceUnitDto } from './dto/placeUnit.dto';

@UseGuards(AuthHTTPGuard)
@Controller('game')
export class GameController {
    constructor(private gameService:GameService){}


    @Post()
    createNewGame(@Body() payload:CreateGameDto, @Request() req){
        payload.user_uuid = req['user'].sub;
        this.gameService.createGame(payload);
    }

    @Post('/:game_uuid/start')
    startGame(@Param('game_uuid') game_uuid:string, @Request() req){
        let payload:GameANDUserDTO;
        payload.user_uuid = req['user'].sub;
        payload.game_uuid = game_uuid;
        this.gameService.startGame(payload)
    }

    @Post('/:game_uuid/join')
    joinGame(@Param('game_uuid') game_uuid:string, @Request() req){
        let payload:GameANDUserDTO;
        payload.user_uuid = req['user'].sub;
        payload.game_uuid = game_uuid;
        this.gameService.joinGame(payload)
    }

    @Post('/:game_uuid/leave')
    leaveGame(@Param('game_uuid') game_uuid:string, @Request() req){
        let payload:GameANDUserDTO;
        payload.user_uuid = req['user'].sub;
        payload.game_uuid = game_uuid;
        this.gameService.leaveGame(payload)
    }

    @Post('/:game_uuid/placeUnit')
    placeUnit(@Param('game_uuid') game_uuid:string,@Body() payload:PlaceUnitDto, @Request() req){
        payload.user_uuid = req['user'].sub;
        payload.game_uuid = game_uuid;
        this.gameService.placeUnit(payload)
    }


}

