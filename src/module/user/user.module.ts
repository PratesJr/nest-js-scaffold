import { User } from '@app/database/entity/user.entity';
import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { UserController } from './user.controller';
import { UserServiceImpl } from './user.service';
dotenv.config();

@Module({
  controllers: [UserController],
  providers: [
    { provide: 'UserEntity', useValue: User },
    { provide: 'UserService', useClass: UserServiceImpl },
  ],
  exports: [
    { provide: 'UserService', useClass: UserServiceImpl },
    { provide: 'UserEntity', useValue: User },
  ],
})
export class UserModule {}
