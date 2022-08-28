import { Provider } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
dotenv.config();

export const DatabaseProvider: Provider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const db: Sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        logging: false,
        benchmark: false,
        retry: {
          max: 3,
        },
        operatorsAliases: {
          $like: Op.like,
          $iLike: Op.iLike,
          $not: Op.not,
          $in: Op.in,
          $notIn: Op.notIn,
          $lowerOrEqualThen: Op.lte,
          $lowerThen: Op.lt,
        },
      },
    );
    db.addModels([]);

    return db;
  },
};
