import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { QueryMethods } from 'src/helper/query-methods';

import { QueryParams } from 'src/types/query-params.dto';
import { UserService } from './user.interface';

@Controller('user')
//TODO: refresh token route and method
export class UserController {
  private _queryMethods = new QueryMethods();
  private _logger = new Logger('USER_CONTROLLER');
  // eslint-disable-next-line no-empty-function, prettier/prettier, no-unused-vars
  constructor(@Inject('UserService') private _userService: UserService) {

  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Query() query: QueryParams): any {
    const { where } = this._queryMethods.queryConstructor('User', query);
    return this._userService
      .find()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        this._logger.error(err);
        throw new BadRequestException();
      });
  }
}
