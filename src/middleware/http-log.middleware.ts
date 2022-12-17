import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
const errorCodes = [500, 400, 401, 403, 404];
@Injectable()
export class HttpLogMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const now = Date.now();
      this.logger[errorCodes.includes(statusCode) ? 'error' : 'log'](
        // eslint-disable-next-line prettier/prettier
        `${method} ${baseUrl} statusCode: ${statusCode} - user-agent: ${userAgent} -  after ${Date.now() - now
        }ms`,
      );
    });

    next();
  }
}
