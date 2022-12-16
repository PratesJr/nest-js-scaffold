import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const errorCodes = [500, 400, 401, 403, 404];

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response: Response = context.switchToHttp().getResponse();
        const delay: number = Date.now() - now;
        if (!errorCodes.includes(response.status)) {
          this.logger.error(
            `${response.status} | [${request.method}] ${request.url} - after ${delay}ms`,
          );
        }
        this.logger.log(
          `${response.status} | [${request.method}] ${request.url} - after ${delay}ms`,
        );
      }),
    );
  }
}
