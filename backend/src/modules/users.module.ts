import { Module } from '@nestjs/common';
import { ResponseService } from 'src/services/response.service';
import { UsersService } from 'src/services/users.service';

import { UsersController } from '../controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ResponseService],
  exports: [UsersService],
})
export class UsersModule {}
