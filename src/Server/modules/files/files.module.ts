import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { fileUploadConfig } from './files.config';
import { FilesService } from './files.service';

@Module({
  imports: [ConfigModule.forFeature(fileUploadConfig)],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
