import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './utilities/logger/logger.module';
import { V1Module } from './api/v1/v1.module';
import { env } from './config/env';
// import { AdminModule } from './api/admin/admin.module';
import { AppLoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1 * 1000,
        limit: 20,
      },
      {
        name: 'medium',
        ttl: 10 * 1000,
        limit: 40,
      },
      {
        name: 'long',
        ttl: 60 * 1000,
        limit: 200,
      },
    ]),
    LoggerModule,
    V1Module,
    // AdminModule,
    // ...(env.NODE_ENV === 'test' ? [] : [AuthModule]), // strip module that can not be run in test env
    ...(env.NODE_ENV === 'test' ? [] : []), // strip module that can not be run in test env
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
