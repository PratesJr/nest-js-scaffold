import { VerifyCallback } from 'passport-google-oauth20';

export class AuthDto {
  accessToken: string;
  refreshToken: string;
  profile: any;
  done: VerifyCallback;
}
