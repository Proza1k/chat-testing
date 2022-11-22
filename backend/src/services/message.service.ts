import { Message } from 'src/entities/message.entity';
import { MessageInterface } from 'src/interfaces/message.interface';

export class MessageService {
  async saveMessage(data: MessageInterface) {
    try {
      const message = Message.create(data);
      await message.save();

      const messages = await this.getMessagesByUserId(data.from._id);
      return {
        payload: messages,
        message: 'Message saved successfully',
      };
    } catch (error) {
      return {
        message: `Error: ${error}`,
      };
    }
  }

  async getMessagesByUserId(userId: string) {
    try {
      const messages = await Message.find({
        where: {
          $or: [{ 'from._id': userId }, { 'to._id': userId }],
        },
      });

      const sortedMessageByDate = messages.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      return sortedMessageByDate;
    } catch (error) {
      return {
        message: `Error: ${error}`,
      };
    }
  }
}
