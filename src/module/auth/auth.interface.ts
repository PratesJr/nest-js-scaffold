/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthDto } from 'src/types/auth.dto';

export interface AuthService {
  generateToken(userInfo: UserInfoDto, now: number): Promise<AuthDto>;
  generateRefreshToken(now: number, sub: string): Promise<string>;
  authenticate(req: UserInfoDto): Promise<AuthDto>;
  logout(token: string): Observable<AxiosResponse<any>>;
}
