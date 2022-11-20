import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.interface';

@Injectable()
export class AuthServiceImpl implements AuthService {
  // googleLogin(req) {
  //   if (!req.user) {
  //     return 'No user from google';
  //   }
  //   return {
  //     message: 'User information from google',
  //     user: req.user,
  //   };
  // }

  generateToken(): void {
    return;
  }
  refreshToken(): void {
    return;
  }
}
