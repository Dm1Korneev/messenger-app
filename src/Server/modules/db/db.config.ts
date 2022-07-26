import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IDbConfig {
  MONGODB_URI: string;
}

const schema = Joi.object<IDbConfig, true>({
  MONGODB_URI: Joi.string().required(),
});

export const dbConfig = registerAs<IDbConfig>('db-config', () => {
  const values = {
    MONGODB_URI: process.env.MONGODB_URI,
  };

  const { error } = schema.validate(values);

  if (error) {
    throw new Error(`env validation fail: ${error.message}`);
  }

  return values;
});
