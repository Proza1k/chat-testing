import { Module } from '@nestjs/common';
import { MessageController } from 'src/controllers/message.controller';
import { MessageService } from 'src/services/message.service';
import { ResponseService } from 'src/services/response.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, ResponseService],
  exports: [MessageService],
})
export class MessageModule {}
