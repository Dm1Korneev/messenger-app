import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateChatDto, UpdateChatDto, ChatDto } from 'Types';

import { FilesService } from '../files';

import { Chat, ChatDocument } from './chat.schema';

@Injectable()
export class ChatsService {
  private readonly logger = new Logger(ChatsService.name);

  constructor(
    @InjectModel(Chat.name) private ChatModel: Model<ChatDocument>,
    private filesService: FilesService,
  ) {}

  async findAll(userId: string): Promise<ChatDto[]> {
    return this.ChatModel.find({ users: userId });
  }

  async findOne(sid: string): Promise<ChatDto> {
    const chat = await this.ChatModel.findById(sid);

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const result = chat.toObject<ChatDto>();
    return result;
  }

  async create(
    createChatDto: CreateChatDto,
    admin: string,
    avatarFile: Express.Multer.File = null,
  ): Promise<ChatDto> {
    const chat = new this.ChatModel({ ...createChatDto, admin });
    await this.setAvatar(chat, avatarFile, createChatDto.avatar);

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    try {
      const savedChat = await chat.save();
      const result = savedChat.toObject();
      return result;
    } catch (e) {
      throw new InternalServerErrorException('Failed to save chat');
    }
  }

  async update(
    sid: string,
    updateChatDto: UpdateChatDto,
    avatarFile?: Express.Multer.File,
  ): Promise<ChatDto> {
    const chatToModify = await this.ChatModel.findByIdAndUpdate(sid, {
      title: updateChatDto.title,
      users: updateChatDto.users,
    });

    if (!chatToModify) {
      throw new NotFoundException('Chat not found');
    }

    const chat = await this.setAvatar(chatToModify, avatarFile, updateChatDto.avatar);

    try {
      return (await chat.save()).toObject();
    } catch (e) {
      throw new InternalServerErrorException('Failed to save chat');
    }
  }

  private async setAvatar(
    chatParam: ChatDocument,
    avatarFile?: Express.Multer.File,
    avatar?: string,
  ): Promise<ChatDocument> {
    const chat = chatParam;
    if (avatarFile) {
      chat.avatar = await this.filesService.upload(avatarFile);
    } else if (avatar === 'undefined') {
      chat.avatar = '';
    }
    return chat;
  }
}
