import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserInterface } from 'src/interfaces/user.interface';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ResponseService } from 'src/services/response.service';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  create(@Body() user: UserInterface) {
    return this.usersService.create(user);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllFriends(@Req() { user }) {
    const result = await this.usersService.getAllUsers(user.userId);

    return this.responseService.success({
      payload: result,
      message: 'Users found successfully',
    });
  }
}
