import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessageService } from 'src/services/message.service';

@WebSocketGateway(3333, { cors: '*' })
export class SocketProvider
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('Socket init Done');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('message_to_server')
  async handleMessage(_client: Socket, payload: any) {
    const result = await this.messageService.saveMessage(payload);
    this.server.emit('message_to_client', result);
  }

  @SubscribeMessage('friends_to_server')
  async handleFriends() {
    this.server.emit('friends_to_client', 'friends');
  }
}
