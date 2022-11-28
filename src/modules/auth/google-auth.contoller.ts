import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from 'src/guard/google.oauth.guard';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { AuthService } from './auth.interface';

@Controller('auth/google')
export class GoogleAuthController {
  // eslint-disable-next-line no-empty-function, prettier/prettier
  constructor(@Inject('AuthService') private _authService: AuthService) { }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  auth(): void {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(200)
  redirect(@Req() _req): any {
    return {
      accessToken: this._authService.authenticate(_req.user),
    };
  }
}
