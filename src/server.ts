import { Server } from 'socket.io';

export let serverVar: Server;

export function setServer(server: Server) {
  serverVar = server;
}
