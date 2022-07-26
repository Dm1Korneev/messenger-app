import { pbkdf2Sync, randomBytes } from 'crypto';

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService, UserDocument } from '../users';

import { TokenPayload } from './constants';
import { LoginDto, RegisterDto, TokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    return this.getToken(user);
  }

  async register(
    registerDto: RegisterDto,
    avatarFile?: Express.Multer.File,
  ): Promise<TokenDto> {
    const user = await this.usersService.create(registerDto, avatarFile);
    return this.getToken(user);
  }

  private getToken(user: UserDocument): TokenDto {
    const payload: TokenPayload = {
      id: user._id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(email);
    return this.getHash(password, user.salt) === user.hash;
  }

  private getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  getAuthData(password: string): { salt: string; hash: string } {
    const salt = randomBytes(16).toString('hex');
    const hash = this.getHash(password, salt);
    return { salt, hash };
  }
}
