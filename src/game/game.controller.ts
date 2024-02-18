import { Body, Controller, Post, UseGuards, Request, Param, Get, Req } from '@nestjs/common';
import { AuthHTTPGuard } from 'src/auth/authHTTP.guard';
import { CreateGameDto } from './dto/createGame.dto';
import { GameService } from './game.service';
import { GameANDUserDTO } from './dto/gameUser.dto';
import { PlaceUnitDto } from './dto/placeUnit.dto';
import { UnitActionDto } from 'src/unit/dto/unitAction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthHTTPGuard)
@Controller('game')
@ApiBearerAuth('JWT-auth')
@ApiTags('Game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('/allgamesbyuser')
  getAllGamesUser(@Request() req: Request) {
    return this.gameService.getAllGameByUser(req['user'].sub);
  }

  @Get('/publicgames')
  getAllPublicGamesGamesUser(@Request() req: Request) {
    return this.gameService.getAllPublicGames(req['user'].sub);
  }
  @Post()
  createNewGame(@Body() payload: CreateGameDto, @Request() req) {
    payload.user_uuid = req['user'].sub;
    this.gameService.createGame(payload);
  }

  @Post('/:game_uuid/start')
  startGame(@Param('game_uuid') game_uuid: string, @Request() req) {
    let payload: GameANDUserDTO;
    payload.user_uuid = req['user'].sub;
    payload.game_uuid = game_uuid;
    this.gameService.startGame(payload);
  }

  @Post('/:game_uuid/join')
  joinGame(@Param('game_uuid') game_uuid: string, @Request() req) {
    this.gameService.joinGame({ user_uuid: req['user'].sub, game_uuid: game_uuid });
  }

  @Post('/:game_uuid/leave')
  leaveGame(@Param('game_uuid') game_uuid: string, @Request() req) {
    let payload: GameANDUserDTO;
    payload.user_uuid = req['user'].sub;
    payload.game_uuid = game_uuid;
    this.gameService.leaveGame(payload);
  }

  @Post('/:game_uuid/placeUnit')
  placeUnit(@Param('game_uuid') game_uuid: string, @Body() payload: PlaceUnitDto, @Request() req) {
    payload.user_uuid = req['user'].sub;
    payload.game_uuid = game_uuid;
    this.gameService.placeUnit(payload);
  }

  @Post('/:game_uuid/action')
  async sendActionUnit(@Param('game_uuid') game_uuid: string, @Body() payload: UnitActionDto, @Request() req) {
    payload.user_uuid = req['user'].sub;
    payload.game_uuid = game_uuid;
    return await this.gameService.actionUnit(payload);
  }

  @Get('/:game_uuid')
  getGame(@Param('game_uuid') game_uuid: string, @Request() req) {
    return this.gameService.getGame(game_uuid);
  }
}
