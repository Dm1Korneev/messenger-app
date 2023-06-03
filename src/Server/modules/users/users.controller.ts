import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateUserDto, UserDto } from 'Types';

import { TokenPayload } from '../auth';
import { AuthUser } from '../auth/auth-user.decorator';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('current')
  current(@AuthUser() user: TokenPayload): Promise<UserDto> {
    return this.usersService.findOne(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatarFile?: Express.Multer.File,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto, avatarFile);
  }
}
