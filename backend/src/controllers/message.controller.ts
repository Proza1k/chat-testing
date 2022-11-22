import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { MessageInterface } from 'src/interfaces/message.interface';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { SocketProvider } from 'src/providers/socket.provider';
import { MessageService } from 'src/services/message.service';
import { ResponseService } from 'src/services/response.service';
import { RequestServiceData } from 'src/types/request';

@Controller('/messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMessages(@Req() { user }) {
    const messages = await this.messageService.getMessagesByUserId(user.userId);
    return this.responseService.success({
      payload: messages,
      message: 'Messages found successfully',
    });
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createMessage(@Body() request: RequestServiceData<MessageInterface>) {
    const result = await this.messageService.saveMessage(request.payload);
    return this.responseService.success(result);
  }
}
