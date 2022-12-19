import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from 'src/guard/google.oauth.guard';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RefreshTokenGuard } from 'src/guard/refresh-token.guard';
import { AuthDto } from 'src/types/auth.dto';
import { AuthService } from './auth.interface';

@Controller('auth/google')
//TODO: refresh token and methods
export class GoogleAuthController {
  // eslint-disable-next-line no-empty-function, prettier/prettier, no-unused-vars
  constructor(@Inject('AuthService') private _authService: AuthService) { }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  auth(): void {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(200)
  redirect(@Req() _req): Promise<AuthDto> {
    return this._authService.authenticate(_req.user);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  refreshToken(@Request() req: any): Promise<AuthDto> {
    return this._authService.refreshCredentials({ id: req.user.sub });
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  hello(): any {
    return 'hello';
  }
}
