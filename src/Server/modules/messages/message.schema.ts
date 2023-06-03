import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { DbDocument } from 'Types';

import { Chat } from '../chats';
import { User } from '../users';

@Schema()
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true })
    chat: Chat;

  @Prop({ required: true })
    text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    author: User;

  @Prop({ type: Date, default: Date.now, required: true })
    dateTime: Date;
}

export type MessageDocument = DbDocument<Message>;

export const MessageSchema = SchemaFactory.createForClass(Message);
