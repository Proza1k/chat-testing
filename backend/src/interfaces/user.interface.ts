import { IsEmail, IsNotEmpty } from 'class-validator';
import { AvatarFullConfig } from 'src/types/avatar';

export class UserInterface {
  @IsNotEmpty()
  _id?: string;

  @IsEmail()
  @IsNotEmpty()
  login: string;

  avatar: AvatarFullConfig;
}
