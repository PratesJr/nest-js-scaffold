import { Inject, Injectable, Logger } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { User } from 'src/database/entity/user.entity';
import { UserDto } from 'src/types/user.dto';
import { UserService } from './user.interface';

@Injectable()
export class UserServiceImpl implements UserService {
  private _logger = new Logger();
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject('UserEntity') private _user: typeof User) {
    this._logger.log(UserServiceImpl.name);
  }

  async create(user: UserDto): Promise<User> {
    return this._user.create({ ...user });
  }
  async find(query?: FindOptions<any>): Promise<User[]> {
    return this._user.findAll({
      ...query,
    });
  }

  async count(query?: FindOptions<any>): Promise<number> {
    return this._user.count({ ...query });
  }
  async delete(query: FindOptions<any>): Promise<number> {
    return this._user.destroy({ ...query });
  }
}
