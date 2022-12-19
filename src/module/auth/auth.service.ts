import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthService } from './auth.interface';
import { isNil } from 'lodash';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt-payload.dto';
import { DateTime } from 'luxon';
import { AuthDto } from 'src/types/auth.dto';
import { UserService } from '../user/user.interface';
import { LoginFrom } from 'src/types/oauth-types.enum';
import { User } from 'src/database/entity/user.entity';
import { Id } from 'src/types/id.dto';
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
  ) {
    // this.route = process.env.REVOKE_GOOGLE_TOKEN_URI;
  }
  authenticate(user: UserInfoDto): Promise<AuthDto> {
    if (isNil(user)) {
      return null;
    }
    return this._userService
      .create({
        email: user.email,
        loginFrom: LoginFrom.GOOGLE,
        name: `${user.firstName} ${user.lastName}`,
      })
      .then((newUser: User) => {
        return this.generateToken(
          { ...user, sub: newUser.id },
          DateTime.utc().toMillis(),
        );
      });
  }
  //TODO: cache the old refresh token in a deny list
  refreshCredentials(userId: Id): Promise<AuthDto> {
    return this._userService
      .findByPK(userId)
      .then((user) => {
        return this.generateToken(
          { ...user, sub: user.id },
          DateTime.utc().toMillis(),
        ).then((credentials) => {
          return credentials;
        });
      })
      .catch((err) => {
        this._logger.error(err);
        throw err;
      });
  }

  generateToken(userInfo: UserInfoDto, now: number): Promise<AuthDto> {
    const payload: JwtPayload = this.makeJwtPayload(userInfo, now);
    return this.jwtService
      .signAsync(JSON.stringify(payload))
      .then((accessToken: string) => {
        return this.generateRefreshToken(
          now,
          payload.sub,
          payload.username,
        ).then((refreshToken: string) => {
          return {
            accessToken,
            refreshToken,
          };
        });
      });
  }

  generateRefreshToken(
    now: number,
    sub: string,
    username: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
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
    );
  }

  // oAuthlogout(token: string): Observable<AxiosResponse<any>> {
  //   return this.httpService
  //     .get(`${this.route}${token}`)
  //     .pipe(map((response) => response.data));
  // }

  // logout(token: string): Observable<AxiosResponse<any>> { }
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
      username: userInfo.email,
    };
  }
}
