import { Test, TestingModule } from '@nestjs/testing';
import * as redisMock from 'redis-mock';
import { RepositoryMock } from '@app/mocks/repository.mock';
import { UserService } from './user.interface';
import { UserServiceImpl } from './user.service';

export const RedisInstanceMock = redisMock.createClient();

describe('User Service', () => {
  let app: TestingModule;
  let _userService: UserService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        { provide: 'UserService', useClass: UserServiceImpl },
        { provide: 'UserEntity', useValue: RepositoryMock },
      ],
    }).compile();

    _userService = app.get<UserService>('UserService');
  });

  describe('Service', () => {
    it('should be defined', () => {
      expect(_userService).toBeDefined();
    });
  });
});
