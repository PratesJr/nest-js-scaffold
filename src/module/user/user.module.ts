import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { User } from 'src/database/entity/user.entity';
import { UserServiceImpl } from './user.service';
dotenv.config();

@Module({
  controllers: [],
  providers: [
    { provide: 'UserEntity', useValue: User },
    { provide: 'UserService', useClass: UserServiceImpl },
  ],
  exports: [
    { provide: 'UserService', useClass: UserServiceImpl },
    { provide: 'UserEntity', useValue: User },
  ],
})
// eslint-disable-next-line prettier/prettier
export class UserModule { }