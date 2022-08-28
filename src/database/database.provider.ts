import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export const DatabaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        operatorsAliases: {
          [Op.like]: '$like',
          [Op.and]: '$and',
          [Op.gt]: '$gt',
          [Op.gte]: '$gte',
          [Op.iLike]: '$ilike',
        },
      });
      sequelize.addModels([]);

      return sequelize;
    },
  },
];
