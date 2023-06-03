import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateChatDto, UpdateChatDto, ChatDto } from 'Types';

import { TokenPayload } from '../auth';
import { AuthUser } from '../auth/auth-user.decorator';

import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  findAll(
    @AuthUser() user: TokenPayload,
  ): Promise<ChatDto[]> {
    return this.chatsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ChatDto> {
    return this.chatsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createChatDto: CreateChatDto,
    @UploadedFile() avatarFile: Express.Multer.File,
    @AuthUser() user: TokenPayload,
  ): Promise<ChatDto> {
    return this.chatsService.create(createChatDto, user.id, avatarFile);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ): Promise<ChatDto> {
    return this.chatsService.update(id, updateChatDto, avatarFile);
  }
}
