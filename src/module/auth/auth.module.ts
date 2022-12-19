import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthServiceImpl } from './auth.service';
import { GoogleAuthController } from './google-auth.contoller';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../../strategy/google.strategy';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { RefreshTokenStrategy } from 'src/strategy/refresh-token.strategy';
import { UserModule } from '../user/user.module';
dotenv.config();

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
    PassportModule,
    UserModule,
  ],
  controllers: [GoogleAuthController],
  providers: [
    { useClass: AuthServiceImpl, provide: 'AuthService' },
    GoogleStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
  exports: [],
})
// eslint-disable-next-line prettier/prettier
export class AuthModule { }
