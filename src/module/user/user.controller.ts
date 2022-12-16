import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  ParseUUIDPipe,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { QueryMethods } from 'src/helper/query-methods';
import { UserQuery } from 'src/types/user-query.dto';
import { UserService } from './user.interface';
import { User } from 'src/database/entity/user.entity';

@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('user')
//TODO: refresh token route and method
export class UserController {
  private _queryMethods = new QueryMethods();
  private _logger = new Logger('USER_CONTROLLER');
  private readonly entity = 'User';
  // eslint-disable-next-line no-empty-function, prettier/prettier, no-unused-vars
  constructor(@Inject('UserService') private _userService: UserService) {

  }

  @Get()
  getUser(@Query() query: UserQuery): any {
    const { where } = this._queryMethods.queryConstructor(this.entity, query);

    return this._userService
      .find({ where })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        this._logger.error(err);
        throw new BadRequestException();
      });
  }
  @Get(':id')
  getUserByPK(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<User> {
    return this._userService.findByPK({
      id,
    });
  }
}
