import { ID } from '../base-types';
import { UserDto } from '../user';

export class ChatDto {
  admin!: UserDto['_id'];

  avatar!: string;

  title!: string;

  users!: UserDto['_id'][];

  _id!: ID;
}
