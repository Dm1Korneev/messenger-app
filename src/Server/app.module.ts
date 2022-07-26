import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  ChatsModule, AuthModule, MessagesModule, DBModule,
} from './modules';

@Module({
  imports: [
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
