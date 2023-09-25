import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GameCreate } from './dto/gameCreate.dto';
/**
 * Encargada de enviar y recibir toda la informacion en el juego
 */
@WebSocketGateway()
export class GameGateway {

  @SubscribeMessage('sendInitGame')
  initGame(@MessageBody() msg: GameCreate){

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