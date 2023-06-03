import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
