import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('ccc');
    
  }
  @SubscribeMessage('sendChat')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() chatText:string) {
    console.log('Message '.concat(chatText));
    //client.emit('event', chatText);
    this.server.emit('event', chatText)
    //return 'Hello world!';
  }
}
