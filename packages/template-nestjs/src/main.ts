import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/modules/app.module';
import { env } from '@/common/env.validator';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  await app.listen(env.PORT);
}

bootstrap();
