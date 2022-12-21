import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  // eslint-disable-next-line no-empty-function,  no-unused-vars
  constructor(@Inject('AuthService') private _authService: AuthService) { }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  auth(): void {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(200)
  redirect(@Req() _req: any): Promise<AuthDto> {
    return this._authService.authenticate(_req.user);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  refreshCredential(@Request() _req: any): Promise<AuthDto> {
    console.log(_req.user);
    return this._authService
      .refreshCredentials({ id: _req.user.sub })
      .then((accessToken: string) => {
        return {
          accessToken,
          refreshToken: _req.user.refreshToken,
        };
      });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  logout(@Request() req: any): Promise<void> {

    return this._authService.logout(
      req.user.accessToken,
      req.user.sub,
      Number(req.user.exp),
    );
  }
}
