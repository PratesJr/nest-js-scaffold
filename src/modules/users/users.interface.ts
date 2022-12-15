import { FindOptions } from 'sequelize';

export interface UserService {
  create(): Promise<any>;
  find(query?: FindOptions): Promise<any>;
  update(): Promise<any>;
  delete(query: FindOptions): Promise<number>;
}
