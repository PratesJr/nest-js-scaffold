/* eslint-disable no-unused-vars */
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthDto } from 'src/types/auth.dto';
import { Id } from 'src/types/id.dto';

export interface AuthService {
  generateToken(userInfo: UserInfoDto, now: number): Promise<AuthDto>;
  generateRefreshToken(
    now: number,
    sub: string,
    username: string,
  ): Promise<string>;
  authenticate(req: UserInfoDto): Promise<AuthDto>;
  refreshCredentials(userId: Id): Promise<AuthDto>;
  // logout(token: string): Observable<AxiosResponse<any>>;
}
