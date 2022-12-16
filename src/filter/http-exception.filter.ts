/* eslint-disable no-empty-function */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
const mappedCodes = {
  NOTFOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line prettier/prettier, no-unused-vars
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = this.getCode(exception);
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
  private getCode(err: any): any {
    const httpStatus =
      // eslint-disable-next-line prettier/prettier
      mappedCodes[err instanceof HttpException ? err.getStatus() : err?.message] || HttpStatus.INTERNAL_SERVER_ERROR;

    return httpStatus;
  }
}
