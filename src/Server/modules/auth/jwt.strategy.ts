import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IAuthConfig } from './auth.config';
import { TokenPayload } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<IAuthConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<IAuthConfig['JWT_SECRET']>('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload): Promise<TokenPayload> {
    return payload;
  }
}
