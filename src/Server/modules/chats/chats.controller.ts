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

import { TokenPayload } from '../auth';
import { AuthUser } from '../auth/auth-user.decorator';

import { ChatDocument } from './chat.schema';
import { ChatsService } from './chats.service';
import { CreateChatDto, UpdateChatDto } from './dto';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  findAll(
    @AuthUser() user: TokenPayload,
  ): Promise<ChatDocument[]> {
    return this.chatsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ChatDocument> {
    return this.chatsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createChatDto: CreateChatDto,
    @UploadedFile() avatarFile: Express.Multer.File,
    @AuthUser() user: TokenPayload,
  ): Promise<ChatDocument> {
    return this.chatsService.create(createChatDto, user.id, avatarFile);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ): Promise<ChatDocument> {
    return this.chatsService.update(id, updateChatDto, avatarFile);
  }
}
