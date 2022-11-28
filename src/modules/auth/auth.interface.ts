/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/types/auth-user.dto';

export interface AuthService {
  generateToken(userInfo: UserInfoDto, now: number): string;
  refreshToken(): void;
  authenticate(req: UserInfoDto): string;
  logout(token: string): Observable<AxiosResponse<any>>;
}
