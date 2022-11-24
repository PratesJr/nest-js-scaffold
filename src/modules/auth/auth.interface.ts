export interface AuthService {
  generateToken(): void;
  refreshToken(): void;
  googleLogin(req: Request): Promise<any>;
}
