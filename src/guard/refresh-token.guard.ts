import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DateTime } from 'luxon';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (!user) {
      new UnauthorizedException();
    }
    if (err) {
      throw err;
    }
    if (
      DateTime.now().toUTC().toISO() >=
      DateTime.fromMillis(Number(user.exp)).toUTC().toISO()
    ) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
