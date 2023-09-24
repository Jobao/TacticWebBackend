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

  handleConnection(client: Socket, ...args: any[]) {
    client.join('lobby');
  }
  @SubscribeMessage('sendChat')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() chatText:string) {
    this.server.to(Array.from(client.rooms)).emit('sendChat', {id: client.id, text: chatText})
    //return 'Hello world!';
  }

  @SubscribeMessage('changeRoom')
  changeRoom(@ConnectedSocket() client: Socket, @MessageBody() newRoom:string) {
    client.join(newRoom);
    
  }

  @SubscribeMessage('myRoom')
  myRooms(@ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('myRoom',Array.from(client.rooms)[1]);
  }
}
