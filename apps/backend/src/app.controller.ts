import { Controller, Get, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/health')
  getHealth(): string {
    return 'OK';
  }

  @Get('/favicon.ico')
  getFavicon() {
    return new StreamableFile(this.appService.getFavicon()); // .pipe(response);
  }

  @Get('/api/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/')
  getHelloRoot(): string {
    return 'OK';
  }
}
