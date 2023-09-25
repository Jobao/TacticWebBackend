import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io'
import { ChatDto } from './dto/chat.dto';
import { PrivateChatDto } from './dto/privateChat.dto';

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
  @SubscribeMessage('sendPublicChat')
  handlePublicMessage(@ConnectedSocket() client: Socket, @MessageBody() chatText:ChatDto) {
    //Recibo el texto y lo envio a todos que estan en el canal
    this.server.to(Array.from(client.rooms)).emit('publicChat', {id: client.id, text: chatText.text})
  }

  @SubscribeMessage('sendPrivateChat')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() chatText:PrivateChatDto) {

    this.server.to(chatText.idTo).emit('privateChat', {id: client.id, text: chatText.text})
  }
}
