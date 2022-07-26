import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IAuthConfig {
  JWT_SECRET: string;
}

const schema = Joi.object<IAuthConfig, true>({
  JWT_SECRET: Joi.string().required(),
});

export const authConfig = registerAs<IAuthConfig>('auth-config', () => {
  const values = {
    JWT_SECRET: process.env.JWT_SECRET,
  };

  const { error } = schema.validate(values);

  if (error) {
    throw new Error(`env validation fail: ${error.message}`);
  }

  return values;
});
