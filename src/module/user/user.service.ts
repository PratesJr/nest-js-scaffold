import { Inject, Injectable, Logger } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { User } from 'src/database/entity/user.entity';
import { Id } from 'src/types/id.dto';
import { UserDto } from 'src/types/user.dto';
import { UserService } from './user.interface';
import { isNil } from 'lodash';

@Injectable()
export class UserServiceImpl implements UserService {
  private _logger = new Logger('USER_SERVICE');
  // eslint-disable-next-line no-unused-vars, no-empty-function, prettier/prettier
  constructor(@Inject('UserEntity') private _user: typeof User) { }

  create(user: UserDto): Promise<User> {
    return this._user.create({ ...user });
  }
  find(query?: FindOptions<any>): Promise<User[]> {
    return this._user.findAll({
      ...query,
      logging: true,
    });
  }

  findByPK({ id }: Id): Promise<User> {
    return this._user
      .findOne({
        where: {
          id,
        },
      })
      .then((result) => {
        if (isNil(result)) {
          throw new Error('NOTFOUND');
        }
        return result;
      })
      .catch((err: Error) => {
        throw err;
      });
  }

  count(query?: FindOptions<any>): Promise<number> {
    return this._user.count({ ...query });
  }
  delete(query: FindOptions<any>): Promise<number> {
    return this._user.destroy({ ...query });
  }
}
