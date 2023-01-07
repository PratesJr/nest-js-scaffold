import {
  Table,
  Column,
  Model,
  DataType,
  AfterCreate,
} from 'sequelize-typescript';
import { DateTime } from 'luxon';
import { LoginFrom } from '@dto/oauth-types.enum';

@Table({
  modelName: 'user',
  tableName: 'user',
  underscored: true,
  timestamps: true,
  version: false,
  paranoid: true,
  deletedAt: 'deleted_at',
})
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  email: string;
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  loginFrom: LoginFrom;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    get() {
      return this.getDataValue('createdAt')
        ? DateTime.fromSQL(this.getDataValue('createdAt'))
            .setZone('America/Sao_Paulo')
            .toFormat('YYYY-MM-DD HH:mm:ss')
        : null;
    },
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    get() {
      return this.getDataValue('createdAt')
        ? DateTime.fromSQL(this.getDataValue('createdAt'))
            .setZone('America/Sao_Paulo')
            .toFormat('YYYY-MM-DD HH:mm:ss')
        : null;
    },
  })
  updatedAt: Date;

  @AfterCreate({ name: 'clearContent' })
  static clearContent(instance: User) {
    delete instance.loginFrom;
    delete instance.createdAt;
    delete instance.updatedAt;
  }
}
