import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TokenPayload } from './constants';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
