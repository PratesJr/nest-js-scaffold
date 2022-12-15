/* eslint-disable no-unused-vars */
import { FindOptions } from 'sequelize';
import { User } from 'src/database/entities/user.entity';

export interface UserService {
  create(): Promise<User>;
  find(query?: FindOptions): Promise<User[]>;
  delete(query: FindOptions): Promise<number>;
}
