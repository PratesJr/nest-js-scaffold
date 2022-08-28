import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export const DatabaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
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
