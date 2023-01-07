import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { CacheService } from './cache.interface';
import { Cache } from 'cache-manager';
import { CacheDto } from './dto/cache.dto';

@Injectable()
export class CacheServiceImpl implements CacheService {
  private _logger: Logger;
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache) {
    this._logger = new Logger('CACHE_SERVICE');
  }

  cache({ key, userId, value, ttl }: CacheDto): Promise<unknown> {
    return this._cacheManager
      .set(`${key}_${userId}`, value, ttl)
      .catch((err) => {
        this._logger.error(err);
      });
  }

  get(key: string): Promise<unknown> {
    return this._cacheManager
      .get(key)
      .then((cached) => {
        return cached;
      })
      .catch((err) => {
        this._logger.error(err);
      });
  }
  remove(key: string): Promise<void> {
    return this._cacheManager.del(key).catch((err) => {
      this._logger.error(err);
    });
  }
}
