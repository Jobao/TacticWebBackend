import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { CreateGameDto } from './dto/createGame.dto';
import { GameService } from './game.service';
import {Socket} from 'socket.io'
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user';
import { JoinGameDto } from './dto/joinGame.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PlaceUnitDto } from './dto/placeUnit.dto';
import { Public } from 'src/auth/public.decorator';
/**
 * Encargada de enviar y recibir toda la informacion en el juego
 */
@UseGuards(AuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway {
  constructor(private gameService:GameService, private userService:UserService){}

  @SubscribeMessage('sendInitGame')
  initGame(@ConnectedSocket() client: Socket,@MessageBody() payload: CreateGameDto){
    payload.user_uuid = client['user'].sub;
    this.gameService.initGame(payload);
  }

  @SubscribeMessage('sendGetGame')
  getGame(){

  }

  @SubscribeMessage('sendStartGame')
  async startGame(@ConnectedSocket() client: Socket,@MessageBody() payload: CreateGameDto){
    payload.user_uuid = client['user'].sub;
    this.gameService.startGame(payload);
  }

  @SubscribeMessage('sendJoinGame')
  async joinGame(@ConnectedSocket() client: Socket,@MessageBody() payload: JoinGameDto){
    payload.user_uuid = client['user'].sub;
      this.gameService.joinGame(payload);
  }

  @SubscribeMessage('sendLeaveGame')
  async leaveGame(@MessageBody() payload: CreateGameDto){
    this.gameService.leaveGame(payload);
  }

  @SubscribeMessage('sendCreateGame')
  async createGame(@ConnectedSocket() client: Socket, @MessageBody() payload: CreateGameDto){
    payload.user_uuid = client['user'].sub;
    this.gameService.createGame(payload);
  }

  @SubscribeMessage('sendPlaceUnit')
  async placeUnit(@ConnectedSocket() client: Socket, @MessageBody() payload:PlaceUnitDto){
    payload.user_uuid = client['user'].sub;
    
    this.gameService.placeUnit(payload);
  }

  @SubscribeMessage('sendMoveUnit')
  async sendMoveUnit(@ConnectedSocket() client: Socket, @MessageBody() payload:PlaceUnitDto){
    payload.user_uuid = client['user'].sub;
    this.gameService.moveUnit(payload);
  }
  @Public()
  @SubscribeMessage('p')//Esto es para devolver uin mensaje
  async pp(@ConnectedSocket() client: Socket){
      let event = "publicChat";
      let data:boolean = true;
      return "{}";
      //return{event, data }
  }
}


/**
 * Que contiene el juego
 * Contiene una lista de jugadores
 * Contiene un tablero
 * --------------------------METODOS--------------------------
 * GET toda la informacion del tablero
 * GET los jugadores 
 * SET inicial un juego
 */