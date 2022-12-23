/* eslint-disable @typescript-eslint/no-var-requires */
const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis-store');
import * as dotenv from 'dotenv';
dotenv.config();
export const RedisInstance = cacheManager.caching({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  // eslint-disable-next-line camelcase
  auth_pass: process.env.REDIS_DB_PWD,
  db: Number(process.env.REDIS_DB_NAME),
  ttl: Number(process.env.REDIS_TTL),
});
