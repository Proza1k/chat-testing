import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLoginInterface } from 'src/interfaces/auth.interface';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { AuthService } from 'src/services/auth.service';
import { ResponseService } from 'src/services/response.service';
import { RequestServiceData } from 'src/types/request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseService: ResponseService,
  ) {}

  @Post('login')
  async login(@Body() request: RequestServiceData<AuthLoginInterface>) {
    const result = await this.authService.login(request.payload);
    return this.responseService.success(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserByToken(@Req() { user }) {
    const result = await this.authService.getUserById(user.userId);
    return this.responseService.success(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!';
  }
}
