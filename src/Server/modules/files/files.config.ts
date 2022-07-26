import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IFilesConfig {
  S3_BUCKET: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
}

const schema = Joi.object<IFilesConfig, true>({
  S3_BUCKET: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
});

export const fileUploadConfig = registerAs<IFilesConfig>('files-config', () => {
  const values = {
    S3_BUCKET: process.env.S3_BUCKET,
    AWS_ACCESS_KEY_ID: process.env.S3_BUCKET,
    AWS_SECRET_ACCESS_KEY: process.env.S3_BUCKET,
  };

  const { error } = schema.validate(values);

  if (error) {
    throw new Error(`env validation fail: ${error.message}`);
  }

  return values;
});
