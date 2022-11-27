import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthServiceImpl } from './auth.service';
import { GoogleAuthController } from './google-auth.contoller';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
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
