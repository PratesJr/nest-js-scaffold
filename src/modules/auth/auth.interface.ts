import { UserInfoDto } from 'src/types/auth-user.dto';

export interface AuthService {
  generateToken(): void;
  refreshToken(): void;
  googleLogin(req: UserInfoDto): UserInfoDto;
}
