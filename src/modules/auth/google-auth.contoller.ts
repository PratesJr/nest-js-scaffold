import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from 'src/guard/google.oauth.guard';
import { AuthService } from './auth.interface';

@Controller('auth/google')
export class GoogleAuthController {
  // eslint-disable-next-line no-empty-function, prettier/prettier
  constructor(@Inject('AuthService') private _authService: AuthService) { }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async auth(@Request() _req): Promise<void> {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @HttpCode(200)
  async redirect(@Req() _req): Promise<any> {
    return this._authService.googleLogin(_req);
  }
}