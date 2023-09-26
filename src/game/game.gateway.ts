import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CreateGameDto } from './dto/createGame.dto';
import { GameService } from './game.service';
import {Socket} from 'socket.io'
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user';
/**
 * Encargada de enviar y recibir toda la informacion en el juego
 */
@WebSocketGateway()
export class GameGateway {
  constructor(private gameService:GameService, private userService:UserService){}

  @SubscribeMessage('sendInitGame')
  initGame(@MessageBody() msg: CreateGameDto){

  }

  @SubscribeMessage('sendGetGame')
  getGame(){

  }

  @SubscribeMessage('sendStartGame')
  startGame(){

  }

  @SubscribeMessage('sendStartGame')
  joinGame(){
    
  }

  @SubscribeMessage('sendCreateGame')
  async createGame(@ConnectedSocket() client: Socket, @MessageBody() payload: CreateGameDto){
    let tt= await this.userService.findOne(payload.owner_uuid);
    if(tt){
      this.gameService.createGame(payload);
    }
    
    
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