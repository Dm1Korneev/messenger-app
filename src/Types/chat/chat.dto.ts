import { UserDto } from '../user';

export type ChatDto = {
  admin: UserDto['_id'];
  avatar: string;
  title: string;
  users: UserDto['_id'][];
  _id: string;
}
