import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthService } from './auth.interface';
import { isNil } from 'lodash';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthServiceImpl implements AuthService {
  private route: string;
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly httpService: HttpService,
  ) {
    this.route = process.env.REVOKE_GOOGLE_TOKEN_URI;
  }
  authenticate(user: UserInfoDto): UserInfoDto {
    if (isNil(user)) {
      return null;
    }
    return user;
  }

  generateToken(): void {
    return;
  }
  refreshToken(): void {
    return;
  }

  logout(token: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get(`${this.route}${token}`)
      .pipe(map((response) => response.data));
  }
}
