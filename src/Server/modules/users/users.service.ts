import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateUserDto, CreateUserDto } from 'Types';

import { AuthService } from '../auth';
import { FilesService } from '../files';

import { User, UserDocument, UserDocumentExternal } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private filesService: FilesService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async findAll(): Promise<UserDocumentExternal[]> {
    return this.UserModel.find<UserDocumentExternal>({}, 'name avatar email _id');
  }

  async findOne(sid: string) {
    const user = await this.findUserByIdExternal(sid);
    const result = user.toObject();
    return result;
  }

  async create(
    createUserDto: CreateUserDto,
    avatarFile: Express.Multer.File = null,
  ): Promise<UserDocument> {
    if (!await this.isEmailAvailable(createUserDto.email)) {
      throw new BadRequestException('Email is already use');
    }
    if (!await this.isUserNameAvailable(createUserDto.name)) {
      throw new BadRequestException('Username is already use');
    }

    let user = new this.UserModel({
      email: createUserDto.email,
      name: createUserDto.name,
    });
    user = await this.setAvatar(user, avatarFile, createUserDto.avatar);
    user = this.setAuthFields(user, createUserDto.password);

    try {
      const result = await user.save();
      return result;
    } catch (e) {
      throw new InternalServerErrorException('Failed to save user');
    }
  }

  async update(
    sid: string,
    updateUserDto: UpdateUserDto,
    avatarFile?: Express.Multer.File,
  ) {
    const user = await this.findUserById(sid);

    if (!await this.isEmailAvailable(updateUserDto.email, user._id)) {
      throw new BadRequestException('Email is already use');
    }
    if (!await this.isUserNameAvailable(updateUserDto.name, user._id)) {
      throw new BadRequestException('Username is already use');
    }

    user.email = updateUserDto.email;
    user.name = updateUserDto.name;

    await this.setAvatar(user, avatarFile, updateUserDto.avatar);
    this.setAuthFields(user, updateUserDto.password);

    try {
      const result = await user.save();
      return result;
    } catch (e) {
      throw new InternalServerErrorException('Failed to save user');
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async setAvatar(
    userParam: UserDocument,
    avatarFile?: Express.Multer.File,
    avatar?: string,
  ): Promise<UserDocument> {
    const user = userParam;
    if (avatarFile) {
      user.avatar = await this.filesService.upload(avatarFile);
    } else if (avatar === 'undefined') {
      user.avatar = '';
    }
    return user;
  }

  private async findUserByIdExternal(sid: string) {
    const user = await this.UserModel.findById<UserDocumentExternal>(sid, 'name avatar email _id');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async findUserById(sid: string) {
    const user = await this.UserModel.findById(sid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private setAuthFields(userParam: UserDocument, password?: string): UserDocument {
    const user = userParam;
    if (password) {
      const authFields = this.authService.getAuthData(password);
      user.hash = authFields.hash;
      user.salt = authFields.salt;
    }
    return user;
  }

  private async isUserNameAvailable(
    name: string,
    userId?: string,
  ): Promise<boolean> {
    const user = await this.UserModel.findOne({ name, _id: { $ne: userId } });
    return user == null;
  }

  private async isEmailAvailable(
    email: string,
    userId?: string,
  ): Promise<boolean> {
    const user = await this.UserModel.findOne({ email, _id: { $ne: userId } });
    return user == null;
  }
}
