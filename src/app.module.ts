/* eslint-disable @typescript-eslint/no-var-requires */
import { AuthModule } from '@api-module/auth/auth.module';
import { UserModule } from '@api-module/user/user.module';
import { DatabaseLibModule } from '@app/database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HttpLogMiddleware } from './middleware/http-log.middleware';

@Module({
  imports: [DatabaseLibModule, AuthModule, UserModule],
})
// eslint-disable-next-line
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
