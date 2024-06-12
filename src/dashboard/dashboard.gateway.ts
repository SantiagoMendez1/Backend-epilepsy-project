import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET'],
    credentials: true,
  },
})
export class DashboardGateway {
  @WebSocketServer()
  server: Server;

  sendAlertToDashboard(data: any) {
    this.server.emit('alertToDashboard', data);
  }
}
