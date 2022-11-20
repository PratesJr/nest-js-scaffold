import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from 'src/guard/google.oauth.guard';
import { AuthService } from './auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  // eslint-disable-next-line no-empty-function, prettier/prettier
  constructor(private readonly _authService: AuthService) { }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async auth(@Request() _req): Promise<void> {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleOAuthGuard)
  redirect(@Req() _req, @Res() _res) {
    return this._authService.googleLogin(_req);
  }
}
