/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/types/auth-user.dto';

export interface AuthService {
  generateToken(): void;
  refreshToken(): void;
  authenticate(req: UserInfoDto): UserInfoDto;
  logout(token: string): Observable<AxiosResponse<any>>;
}
