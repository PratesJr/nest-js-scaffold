import { CacheService, CacheServiceImpl } from '@lib/cache';
import { CacheKeyType } from '@lib/cache/dto/cache-types.enum';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import * as redisMock from 'redis-mock';

export const RedisInstanceMock = redisMock.createClient();

describe('RedisCacheService', () => {
  let app: TestingModule;
  let _cacheService: CacheService;
  let cache: Cache;
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NzI0MTcwMTQsImV4cCI6MTcwMzk1MzAxNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.DMDcPmCF6ALf4rCwXqMJgpARHsHn1BOviIWlVV6S0f4';
  const userId = '07cea217-4012-4d69-9a03-19ea616dc5c7';
  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          isGlobal: true,
          store: RedisInstanceMock,
        }),
      ],
      providers: [{ provide: 'RedisCacheService', useClass: CacheServiceImpl }],
    }).compile();

    _cacheService = app.get<CacheService>('RedisCacheService');
    cache = app.get<any>(CACHE_MANAGER);
  });

  const mockSuccess = (signature: string) => {
    const methods = {
      set: () => {
        cache.set = jest.fn().mockResolvedValue(Promise.resolve());
      },
      get: () => {
        cache.get = jest.fn().mockResolvedValue(token);
      },
      del: () => {
        cache.del = jest.fn().mockResolvedValue(Promise.resolve());
      },
    };
    methods[signature]();
  };
  describe('Service', () => {
    it('should be defined', () => {
      expect(_cacheService).toBeDefined();
    });
  });

  describe('Success Cases', () => {
    it('should cache the refresh token if the params are valid', () => {
      mockSuccess('set');
      _cacheService
        .cache({
          key: CacheKeyType.REFRESH_TOKEN,
          userId,
          value: token,
          ttl: 30,
        })
        .then((res) => {
          expect(res).toBe(undefined);
          expect(cache.set).toBeCalledTimes(1);
          expect.assertions(2);
        });
    });

    it('should return the cached value if exists', () => {
      mockSuccess('get');
      _cacheService
        .get(`${CacheKeyType.REFRESH_TOKEN}_${userId}`)
        .then((res) => {
          expect(res).toEqual(token);
          expect(cache.get).toBeCalledTimes(1);
          expect.assertions(2);
        });
    });
    it('should delete the cached value', () => {
      mockSuccess('del');
      _cacheService
        .remove(`${CacheKeyType.REFRESH_TOKEN}_${userId}`)
        .then((res) => {
          expect(res).toEqual(undefined);
          expect(cache.del).toBeCalledTimes(1);
          expect.assertions(2);
        });
    });
  });
});
