import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  // eslint-disable-next-line no-unused-vars
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}
