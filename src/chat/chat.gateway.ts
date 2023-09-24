import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {Socket} from 'socket.io'

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('sendChat')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() chatText:string) {
    console.log(chatText);
    client.emit('event', chatText);
    //return 'Hello world!';
  }
}
