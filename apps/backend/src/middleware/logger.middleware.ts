import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { User } from '@core/db';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, body, params, query } = request;

    if (url !== '/' && !url.includes('/health') && !(url.includes('/v1/user-activity-log') && method === 'POST')) {
      response.on('close', () => {
        const { statusCode } = response;
        const contentLength = response.get('content-length');
        this.logger.log(
          JSON.stringify({
            ip,
            method,
            url,
            status: statusCode,
            contentLength,
            user: {
              id: (request.user as User)?.['id'] ?? '',
              email: (request.user as User)?.['loginEmail'] ?? '',
            },
            body,
            params,
            query,
          }),
        );
      });
    }

    next();
  }
}
