/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { DateTime } from 'luxon';
@Table({
  modelName: 'user',
  tableName: 'user',
  underscored: true,
  timestamps: true,
  version: false,
  paranoid: true,
  deletedAt: 'deleted_at',
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email: string;

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
}
