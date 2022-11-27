import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/types/auth-user.dto';
import { AuthService } from './auth.interface';
import { isNil } from 'lodash';

@Injectable()
export class AuthServiceImpl implements AuthService {
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

  logout(): any {
    return;
  }
}
