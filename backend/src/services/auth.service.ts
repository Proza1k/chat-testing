import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { AuthLoginInterface } from 'src/interfaces/auth.interface';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(payload: AuthLoginInterface) {
    const user = await this.validateUser(payload);

    const accessTokenParams = {
      userId: user._id,
      login: user.login,
    };

    return {
      payload: {
        access_token: this.jwtService.sign(accessTokenParams),
        user,
      },
      message: 'User logged in successfully',
    };
  }

  async getUserById(userId: number) {
    const user = await this.usersService.findById(userId);
    return {
      payload: user,
      message: 'User found successfully',
    };
  }

  async validateUser(payload: AuthLoginInterface): Promise<User> {
    const { login } = payload;

    const user = await this.usersService.findByLogin(login);
    if (user) {
      return user;
    } else {
      return await this.usersService.create(payload);
    }
  }
}
