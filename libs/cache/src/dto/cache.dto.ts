import { CacheKeyType } from './cache-types.enum';

export class CacheDto {
  key: CacheKeyType;
  userId: string;
  value: unknown;
  ttl?: number;
}
