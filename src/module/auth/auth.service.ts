import { Inject, Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.interface';
import { isNil } from 'lodash';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';
import { UserService } from '../user/user.interface';
import { CacheService } from '@lib/cache';
import { CacheKeyType } from '@lib/cache/dto/cache-types.enum';
import { User } from '@app/database/entity/user.entity';
import { UserInfoDto } from '@dto/auth-user.dto';
import { AuthDto } from '@dto/auth.dto';
import { Id } from '@dto/id.dto';
import { JwtPayload } from '@dto/jwt-payload.dto';
import { LoginFrom } from '@dto/oauth-types.enum';

dotenv.config();
@Injectable()
export class AuthServiceImpl implements AuthService {
  private _logger = new Logger('AUTH_SERVICE');
  // private route: string;

  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly httpService: HttpService,
    // eslint-disable-next-line no-unused-vars
    private jwtService: JwtService,
    // eslint-disable-next-line no-unused-vars
    @Inject('UserService') private _userService: UserService,
    // eslint-disable-next-line no-unused-vars
    @Inject('RedisCacheService') private _cacheService: CacheService,
  ) {
    // this.route = process.env.REVOKE_GOOGLE_TOKEN_URI;
  }

  authenticate(user: UserInfoDto): Promise<AuthDto> {
    return isNil(user)
      ? null
      : this._userService
          .create({
            email: user.email,
            loginFrom: LoginFrom.GOOGLE,
            name: `${user.firstName} ${user.lastName}`,
          })
          .then((register: User) => {
            const now = DateTime.utc().toMillis();
            return this.generateToken({ ...user, sub: register.id }, now)
              .then((accessToken: string) => {
                return this.generateRefreshToken(
                  now,
                  register.id,
                  register.email,
                ).then((refreshToken: string) => {
                  return {
                    accessToken,
                    refreshToken,
                  };
                });
              })
              .catch((err) => {
                this._logger.error(err);
                throw new Error('UNAUTHORIZED');
              });
          });
  }
  refreshCredentials(userId: Id): Promise<string> {
    return this._userService.findByPK(userId).then((user: User) => {
      return this.generateToken(
        { ...user, sub: user.id },
        DateTime.utc().toMillis(),
      );
    });
  }

  generateToken(userInfo: UserInfoDto, now: number): Promise<string> {
    const payload: JwtPayload = this.makeJwtPayload(userInfo, now);
    return this.jwtService.signAsync(JSON.stringify(payload));
  }

  generateRefreshToken(
    now: number,
    sub: string,
    username: string,
  ): Promise<string> {
    return this.jwtService
      .signAsync(
        JSON.stringify({
          sub,
          iat: now,
          exp: DateTime.fromMillis(now)
            .plus({
              seconds: Number(process.env.JWT_REFRESH_TOKEN_EXP),
            })
            .toUTC()
            .toMillis(),
          username,
          expiresAt: DateTime.fromMillis(now)
            .plus({
              seconds: Number(process.env.JWT_REFRESH_TOKEN_EXP),
            })
            .toUTC()
            .toISO()
            .toString(),
        }),
        { secret: process.env.JWT_REFRESH_TOKEN_SECRET },
      )
      .then((refreshToken) => {
        this._cacheService.cache({
          key: CacheKeyType.REFRESH_TOKEN,
          userId: sub,
          ttl: Number(process.env.JWT_REFRESH_TOKEN_EXP),
          value: refreshToken,
        });
        return refreshToken;
      });
  }

  // OAuthLogout(token: string): Observable<AxiosResponse<any>> {
  //   return this.httpService
  //     .get(`${this.route}${token}`)
  //     .pipe(map((response) => response.data));
  // }

  logout(token: string): Promise<void> {
    const payload: any = this.jwtService.decode(token, { json: true });

    const ttl = Math.round(
      DateTime.fromMillis(
        Number(DateTime.fromMillis(payload.exp).diffNow()),
      ).toSeconds(),
    );

    return this._cacheService
      .remove(`${CacheKeyType.REFRESH_TOKEN}_${payload.sub}`)
      .then(() => {
        this._cacheService.cache({
          key: CacheKeyType.DENY_LIST,
          userId: payload.sub,
          value: token,
          ttl,
        });
      });
  }
  private makeJwtPayload(userInfo: UserInfoDto, now: number): JwtPayload {
    return {
      sub: userInfo.sub,
      exp: DateTime.fromMillis(now)
        .plus({
          seconds: Number(process.env.JWT_EXPIRATION),
        })
        .toUTC()
        .toMillis(),
      iat: now,
      username: userInfo?.email,
    };
  }
}
