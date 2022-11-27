import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthServiceImpl } from './auth.service';
import { GoogleAuthController } from './google-auth.contoller';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { HttpModule } from '@nestjs/axios';
dotenv.config();

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION,
        },
      }),
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [GoogleAuthController],
  providers: [
    { useClass: AuthServiceImpl, provide: 'AuthService' },
    GoogleStrategy,
  ],
  exports: [],
})
// eslint-disable-next-line prettier/prettier
export class AuthModule { }
