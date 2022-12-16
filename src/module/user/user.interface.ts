/* eslint-disable no-unused-vars */
import { FindOptions } from 'sequelize';
import { User } from 'src/database/entity/user.entity';
import { Id } from 'src/types/id.dto';
import { UserDto } from 'src/types/user.dto';

export interface UserService {
  create(user: UserDto): Promise<User>;
  find(query?: FindOptions): Promise<User[]>;
  findByPK(id: Id): Promise<User>;
  delete(query: FindOptions): Promise<number>;
  count(query?: FindOptions): Promise<number>;
}
