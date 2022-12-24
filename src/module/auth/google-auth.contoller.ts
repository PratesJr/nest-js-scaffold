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
import { RefreshTokenGuard } from 'src/guard/refresh-token.guard';
import { AuthDto } from 'src/types/auth.dto';
import { AuthService } from './auth.interface';
import {
  ApiTags,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOkResponse
} from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth/google')
//TODO: Be sure that the refresh token route is working well
export class GoogleAuthController {
  // eslint-disable-next-line no-empty-function,  no-unused-vars
  constructor(@Inject('AuthService') private _authService: AuthService) { }

  @Get()
  @ApiOperation({
    description: 'this route is a direction to auth with google gmail, you can copy the path and past on your browser'
  })
  @UseGuards(GoogleOAuthGuard)
  auth(): void {
    return;
  }

  @Get('redirect')
  @ApiExcludeEndpoint()
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(200)
  redirect(@Req() _req: any): Promise<AuthDto> {
    return this._authService.authenticate(_req.user);
  }

  @Get('refresh-token')
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @ApiOkResponse({
    type: AuthDto
  })
  @ApiUnauthorizedResponse()
  refreshCredential(@Request() _req: any): Promise<AuthDto> {
    return this._authService
      .refreshCredentials({ id: _req.user.sub })
      .then((accessToken: string) => {
        return {
          accessToken,
          refreshToken: _req.user.refreshToken,
        };
      });
  }


  @Get('logout')
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Request() req: any): Promise<void> {
    const accessToken = req.get('Authorization').replace('Bearer', '').trim();
    return this._authService.logout(accessToken);
  }
}
