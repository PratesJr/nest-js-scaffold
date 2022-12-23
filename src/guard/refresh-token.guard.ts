import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DateTime } from 'luxon';
import { CacheService } from 'src/module/cache/cache.interface';
import { CacheKeyType } from 'src/types/cache-types.enum';
import { isNil } from 'lodash';
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {


  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('RedisCacheService') private _cacheService: CacheService
  ) {
    super();

  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {

    if (!user) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    const refreshToken = this.getCache(user);

    if (isNil(refreshToken)) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (err) {
      throw err;
    }
    if (
      DateTime.now().toUTC().toISO() >=
      DateTime.fromMillis(Number(user.exp)).toUTC().toISO()
    ) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    return user;
  }

  getCache(user): any {
    const token = this._cacheService.get(`${CacheKeyType.DENY_LIST}_${user.sub}`);

    return Promise.resolve(token).then((resolved) => {
      return resolved;
    });
  }
}
