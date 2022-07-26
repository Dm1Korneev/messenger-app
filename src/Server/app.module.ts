import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import {
  ChatsModule, AuthModule, MessagesModule, DBModule,
} from './modules';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot(),
    DBModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
