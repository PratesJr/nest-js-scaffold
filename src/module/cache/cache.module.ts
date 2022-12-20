/* eslint-disable @typescript-eslint/no-var-requires */
import { CacheModule, Module } from '@nestjs/common';
import { RedisInstance } from './redis-instance';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: RedisInstance,
    }),
  ],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class RedisCacheModule {
}
