/* eslint-disable no-unused-vars */

import { UserInfoDto } from '@dto/auth-user.dto';
import { AuthDto } from '@dto/auth.dto';
import { Id } from '@dto/id.dto';

export interface AuthService {
  generateToken(userInfo: UserInfoDto, now: number): Promise<string>;
  generateRefreshToken(
    now: number,
    sub: string,
    username: string,
  ): Promise<string>;
  authenticate(req: UserInfoDto): Promise<AuthDto>;
  refreshCredentials(userId: Id): Promise<string>;
  logout(token: string): Promise<void>;
  // OAuthLogout(token: string): Observable<AxiosResponse<any>>;
}
