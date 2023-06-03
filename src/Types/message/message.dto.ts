import { ChatDto } from '../chat';
import { UserDto } from '../user';

export type MessageDto = {
  author: UserDto['_id'];
  chat: ChatDto['_id'];
  dateTime: Date;
  text: string;
  _id: string;
}
