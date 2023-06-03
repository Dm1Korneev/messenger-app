import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMessageDto, MessageDto } from 'Types';

import { Chat, ChatDocument } from '../chats';

import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
    @InjectModel(Chat.name) private ChatModel: Model<ChatDocument>,
  ) {}

  async findAll(chatId: string, userId: string): Promise<MessageDto[]> {
    const chat = await this.ChatModel.findOne({ _id: chatId, users: userId });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return this.MessageModel.find({ chat: chatId }, {}, { sort: 'dateTime' });
  }

  async create(
    chatId: string,
    userId: string,
    createMessageDto: CreateMessageDto,
  ): Promise<MessageDto> {
    const chat = await this.ChatModel.findOne({ _id: chatId, users: userId });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const createdMessage = new this.MessageModel({
      text: createMessageDto.text,
      author: userId,
      chat: chatId,
    });

    try {
      return (await createdMessage.save()).toObject();
    } catch (e) {
      throw new InternalServerErrorException('Failed to save message');
    }
  }
}
