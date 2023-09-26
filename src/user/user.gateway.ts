import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {Socket} from 'socket.io'
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@WebSocketGateway()
export class UserGateway {
  constructor(private userService:UserService){}

  @SubscribeMessage('setNewUser')
  newUser(client: Socket, payload: CreateUserDto) {
    this.userService.create(payload);
  }

  @SubscribeMessage('allUser')
  allUsers() {
    this.userService.findAll();
  }
}
