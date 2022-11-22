import { UserInterface } from './user.interface';

export class MessageInterface {
  from: UserInterface;

  to: UserInterface;

  createdAt: Date;

  updatedAt: Date;

  content: string;
}
