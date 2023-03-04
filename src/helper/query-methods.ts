import { entityParams } from './entity-param';
import { isNil } from 'lodash';

//TODO create  method to validate common query params

export class QueryMethods {
  private _mapper: Map<string, string[]>;
  constructor() {
    this._mapper = this.paramsMapper();
  }
  // public optionsConstructor = ({ total, limit }: any) => {
  //   return {
  //     pages: Math.ceil(total / limit),
  //     total,
  //     limit,
  //   };
  // };

  private whereConstructor = (_entity: string, params: any) => {
    let where: any = {};
    const columns = this._mapper.get(_entity);
    columns.map((row) => {
      where = {
        ...where,
        ...(!isNil(params[row]) && {
          [row]: params[row],
        }),
      };
    });

    return where;
  };

  public queryConstructor = (_entity: string, params: any) => {
    return {
      where: this.whereConstructor(_entity, params),
      // order: this.orderByConstructor(orderBy),
    };
  };

  // private orderByConstructor = (orderBy: string) => {
  //   const order =
  //     orderBy.split(orderBy.includes('-') ? '-' : '+')[1] === '+'
  //       ? [[0], 'ASC']
  //       : [[0], 'DESC'];

  //   return order;
  // };

  private paramsMapper = (): Map<string, string[]> => {
    const params: Map<string, string[]> = new Map<string, string[]>();

    entityParams.forEach((row) => {
      params.set(row.model, row.column);
    });

    return params;
  };
}
