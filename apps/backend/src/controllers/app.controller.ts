import { Controller, Get } from '@nestjs/common';
import * as service from '@/services/app.service';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return service.getHello();
  }
}