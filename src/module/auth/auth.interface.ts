/* eslint-disable no-unused-vars */
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthDto } from 'src/types/auth.dto';
import { Id } from 'src/types/id.dto';

export interface AuthService {
  generateToken(userInfo: UserInfoDto, now: number): Promise<string>;
  generateRefreshToken(
    now: number,
    sub: string,
    username: string,
  ): Promise<string>;
  authenticate(req: UserInfoDto): Promise<AuthDto>;
  refreshCredentials(userId: Id): Promise<string>;
  logout(token: string, userId: string, exp: number): Promise<void>;
  // OAuthLogout(token: string): Observable<AxiosResponse<any>>;
}
