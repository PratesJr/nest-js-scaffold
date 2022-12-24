/* eslint-disable @typescript-eslint/no-var-requires */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HttpLogMiddleware } from './middleware/http-log.middleware';
import { AuthModule } from './module/auth/auth.module';

import { UserModule } from './module/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [AppService],
})
// eslint-disable-next-line 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
