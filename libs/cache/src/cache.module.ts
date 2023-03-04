/* eslint-disable @typescript-eslint/no-var-requires */
import { CacheModule, Module } from '@nestjs/common';
import { CacheServiceImpl } from './cache.service';
import { RedisInstance } from './redis-instance';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: RedisInstance,
    }),
  ],
  controllers: [],
  providers: [{ provide: 'RedisCacheService', useClass: CacheServiceImpl }],
  exports: [{ provide: 'RedisCacheService', useClass: CacheServiceImpl }],
})
export class CacheLibModule {}
