import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { dbConfig, IDbConfig } from './db.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      useFactory: async (configService: ConfigService<IDbConfig, true>) => ({
        uri: configService.get<IDbConfig['MONGODB_URI']>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
