export interface AuthService {
  generateToken(): void;
  refreshToken(): void;
}
