import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { UserInterface } from 'src/interfaces/user.interface';

@Entity()
export class Message extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  from: UserInterface;

  @Column()
  to: UserInterface;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  content: string;
}
