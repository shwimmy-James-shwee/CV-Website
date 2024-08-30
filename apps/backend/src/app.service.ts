import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    try {
      return readFileSync('./git_commit_msg.txt', 'utf8');
    } catch (err) {
      return 'Hello World!';
    }
  }

  getFavicon() {
    return createReadStream('./src/spec/favicon.ico');
  }
}
