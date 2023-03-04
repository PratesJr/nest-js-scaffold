/* eslint-disable no-unused-vars */
import { User } from '@app/database/entity/user.entity';
import { Id } from '@dto/id.dto';
import { UserDto } from '@dto/user.dto';
import { FindOptions } from 'sequelize';

export interface UserService {
  create(user: UserDto): Promise<User>;
  find(query?: FindOptions): Promise<User[]>;
  findByPK(id: Id): Promise<User>;
  delete(query: FindOptions): Promise<number>;
  count(query?: FindOptions): Promise<number>;
}
