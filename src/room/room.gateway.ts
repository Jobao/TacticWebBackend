import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('changeRoom')
  changeRoom(@ConnectedSocket() client: Socket, @MessageBody() newRoom:string) {
    client.rooms.delete('lobby');
    client.join(newRoom);
    
  }

  @SubscribeMessage('myRoom')
  myRooms(@ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('myRoom',Array.from(client.rooms)[1]);
    //TODO: Habria que tener un canal exclusivo para la solicitud de datos de parte del cliente
  }
}
