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
import { isNil } from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line no-unused-vars, no-empty-function
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = this.getCode(exception);

    if (isNil(httpAdapter)) {
      const response = ctx.getResponse();

      return response.status(httpStatus).json({
        statusCode: httpStatus,
        time: new Date().toISOString(),
        path: ctx.getRequest().originalUrl,
      });
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
  private getCode(err: any): any {
    const httpStatus =
      err instanceof HttpException
        ? err.getStatus()
        : mappedCodes[err.message] || HttpStatus.INTERNAL_SERVER_ERROR;

    return httpStatus;
  }
}
