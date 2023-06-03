import { ID } from '../base-types';
import { ChatDto } from '../chat';
import { UserDto } from '../user';

export class MessageDto {
  author!: UserDto['_id'];

  chat!: ChatDto['_id'];

  dateTime!: Date;

  text!: string;

  _id!: ID;
}
