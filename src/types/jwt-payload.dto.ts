export class JwtPayload {
  username: string;
  sub: string;
  iat: number;
  exp: number;
  expiresAt?: string;
}
