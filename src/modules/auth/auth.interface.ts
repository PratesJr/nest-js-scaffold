/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthDto } from 'src/types/auth.dto';

export interface AuthService {
  generateToken(userInfo: UserInfoDto, now: number): AuthDto;
  refreshToken(now: number, sub: string): string;
  authenticate(req: UserInfoDto): AuthDto;
  logout(token: string): Observable<AxiosResponse<any>>;
  validate(): void;
}
