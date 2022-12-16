import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HttpLogMiddleware } from './middleware/http-log.middleware';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
