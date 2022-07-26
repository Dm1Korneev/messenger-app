import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { IFilesConfig } from './files.config';

@Injectable()
export class FilesService {
  constructor(private configService: ConfigService<IFilesConfig>) {}

  async upload(file: Express.Multer.File): Promise<string> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get<IFilesConfig['S3_BUCKET']>('S3_BUCKET'),
        Key: uuidv4(),
        Body: file.buffer,
        ACL: 'public-read',
      })
      .promise();
    return uploadResult.Location;
  }
}
