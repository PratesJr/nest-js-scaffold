import { CacheDto } from './dto/cache.dto';

/* eslint-disable no-unused-vars */
export interface CacheService {
  cache(cachableValue: CacheDto): Promise<unknown>;
  get(key: string): Promise<unknown>;
  remove(key: string): Promise<void>;
}
