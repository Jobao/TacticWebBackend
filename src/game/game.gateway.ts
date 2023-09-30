import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CreateGameDto } from './dto/createGame.dto';
import { GameService } from './game.service';
import {Socket} from 'socket.io'
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user';
import { JoinGameDto } from './dto/joinGame.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PlaceUnitDto } from './dto/placeUnit.dto';
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
  initGame(@MessageBody() msg: CreateGameDto){

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