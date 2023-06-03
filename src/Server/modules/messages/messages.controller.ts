import {
  Controller, Get, Post, Body, Param,
} from '@nestjs/common';

import { CreateMessageDto, MessageDto } from 'Types';

import { TokenPayload } from '../auth';
import { AuthUser } from '../auth/auth-user.decorator';

import { MessagesService } from './messages.service';

@Controller('chats/:chatId/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) { }

  @Get()
  findAll(
    @Param('chatId') chatId: string,
    @AuthUser() user: TokenPayload,
  ): Promise<MessageDto[]> {
    return this.messagesService.findAll(chatId, user.id);
  }

  @Post()
  create(
    @Param('chatId') chatId: string,
    @AuthUser() user: TokenPayload,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageDto> {
    return this.messagesService.create(chatId, user.id, createMessageDto);
  }
}
