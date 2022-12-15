import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthService } from './auth.interface';
import { isNil } from 'lodash';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt-payload.dto';
import { DateTime } from 'luxon';
import { AuthDto } from 'src/types/auth.dto';
dotenv.config();
@Injectable()
export class AuthServiceImpl implements AuthService {
  private route: string;

  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly httpService: HttpService,
    // eslint-disable-next-line no-unused-vars
    private jwtService: JwtService,
  ) {
    this.route = process.env.REVOKE_GOOGLE_TOKEN_URI;
  }
  authenticate(user: UserInfoDto): AuthDto {
    if (isNil(user)) {
      return null;
    }
    return this.generateToken(user, DateTime.utc().toMillis());
  }

  generateToken(userInfo: UserInfoDto, now: number): AuthDto {
    const payload: JwtPayload = {
      sub: '',
      exp: DateTime.fromMillis(now)
        .plus({
          seconds: Number(process.env.JWT_EXPIRATION),
        })
        .toUTC()
        .toMillis(),
      iat: now,
      expiresAt: DateTime.fromMillis(now)
        .plus({
          seconds: Number(process.env.JWT_EXPIRATION),
        })
        .toUTC()
        .toISO()
        .toString(),
      username: userInfo.email,
      fullName: `${userInfo.firstName} ${userInfo.lastName}`,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.refreshToken(now, payload.sub),
    };
  }
  refreshToken(now: number, sub: string): string {
    return this.jwtService.sign({
      sub,
      iat: now,
      exp: DateTime.fromMillis(now)
        .plus({
          seconds: Number(process.env.JWT_REFRESH_TOKEN_EXP),
        })
        .toUTC()
        .toMillis(),
      code: process.env.JWT_REFRESH_TOKEN_CODE,
    });
  }

  logout(token: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get(`${this.route}${token}`)
      .pipe(map((response) => response.data));
  }
  validate(): void {
    return;
  }
}
