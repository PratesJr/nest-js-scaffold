import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.interface';

@Injectable()
export class AuthServiceImpl implements AuthService {
  googleLogin(req: any): Promise<any> {
    if (!req.body.user) {
      return null;
    }
    return undefined;
  }

  generateToken(): void {
    return;
  }
  refreshToken(): void {
    return;
  }
}
