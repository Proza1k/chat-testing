import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserInterface } from 'src/interfaces/user.interface';
import { ObjectID } from 'mongodb';

@Injectable()
export class UsersService {
  async create(payload: UserInterface) {
    const user = User.create(payload);
    await user.save();

    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByLogin(login: string) {
    return await User.findOne({
      where: {
        login: login,
      },
    });
  }

  async getAllUsers(userId: string) {
    return await User.find({
      where: { _id: { $ne: new ObjectID(userId) } },
    });
  }
}
