/* eslint-disable @typescript-eslint/no-var-requires */
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HttpLogMiddleware } from './middleware/http-log.middleware';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
// import * as redisStore from 'cache-manager-redis-store';
const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis-store');

const redisCache = cacheManager.caching({
  store: redisStore,
  host: 'localhost', // default value
  port: 6379, // default value
  // eslint-disable-next-line camelcase
  auth_pass: 'redisPWD',
  db: 0,
  ttl: 600,
});

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    CacheModule.register({
      isGlobal: true,
      store: redisCache,
      host: 'localhost',
      port: 6379,
      ttl: 500,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
