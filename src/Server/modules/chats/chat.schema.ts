import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { DbDocument } from 'Types';

import { User } from '../users';

@Schema()
export class Chat {
  @Prop({ required: true })
    title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    admin: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];

  @Prop()
    avatar: string;
}

export type ChatDocument = DbDocument<Chat>;

export const ChatSchema = SchemaFactory.createForClass(Chat);
