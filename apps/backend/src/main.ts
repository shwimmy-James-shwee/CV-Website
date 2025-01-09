import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileLoggerService } from './utilities/logger/file-logger.service';
import { InsightLoggerService } from './utilities/logger/insight-logger.service';
import { AllExceptionsFilter } from './all-exceptions-filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import './config';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';
import { apiVersion } from '@core/routes';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.setGlobalPrefix(apiVersion, { exclude: ['/', '/api/'] });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useLogger(app.get(FileLoggerService));

  app.useLogger(app.get(InsightLoggerService));

  const config = new DocumentBuilder()
    .setTitle('Application REST API')
    .setDescription('The Application API description')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',

      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .addSecurityRequirements('bearer')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, { ...config });
  SwaggerModule.setup('api/docs', app, document, {
    customCss: readFileSync('./src/spec/style.css', 'utf8'),
    customSiteTitle: 'API Documentation',
    customfavIcon: './favicon.ico',
  });

  const corsOptions: CorsOptions = {
    // origin: 'http://localhost:3000',
    origin: process.env.NODE_ENV === 'local' ? 'http://localhost:3000' : 'https://jamespearce.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.APP_PORT || 8080);
}
bootstrap();
