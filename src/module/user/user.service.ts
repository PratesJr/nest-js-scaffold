import { Inject, Injectable, Logger } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { Id } from 'src/types/id.dto';
import { UserDto } from 'src/types/user.dto';
import { UserService } from './user.interface';
import { isEmpty } from 'lodash';
import { User } from '@app/database/entity/user.entity';

@Injectable()
export class UserServiceImpl implements UserService {
  private _logger = new Logger('USER_SERVICE');
  // eslint-disable-next-line no-unused-vars, no-empty-function
  constructor(@Inject('UserEntity') private _user: typeof User) {}

  create(user: UserDto): Promise<User> {
    return this.find({
      where: { email: user.email, loginFrom: user.loginFrom },
    }).then((result) => {
      return !isEmpty(result) ? result[0] : this._user.create({ ...user });
    });
  }
  find(query?: FindOptions<any>): Promise<User[]> {
    return this._user.findAll({
      ...query,
    });
  }

  findByPK({ id }: Id): Promise<User> {
    return this._user.findOne({
      where: {
        id,
      },
    });
  }

  count(query?: FindOptions<any>): Promise<number> {
    return this._user.count({ ...query });
  }
  delete(query: FindOptions<any>): Promise<number> {
    return this._user.destroy({ ...query });
  }
}
