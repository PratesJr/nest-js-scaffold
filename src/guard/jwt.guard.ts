import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DateTime } from 'luxon';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('aqui qundo', context);
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
      DateTime.fromMillis(Number(user.sub)).toUTC().toISO() ===
      DateTime.now().toUTC().toISO()
    ) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
