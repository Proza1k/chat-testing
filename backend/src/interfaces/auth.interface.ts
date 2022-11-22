import { IsNotEmpty } from 'class-validator';
import { AvatarFullConfig } from 'src/types/avatar';

export class AuthLoginInterface {
  id: number;

  @IsNotEmpty()
  login: string;

  avatar: AvatarFullConfig;

  createdAt: Date;

  updatedAt: Date;
}
