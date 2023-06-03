import { UserDto } from '../user';

export class CreateChatDto {
  title!: string;

  users!: UserDto['_id'][];

  avatar?: string;
}
