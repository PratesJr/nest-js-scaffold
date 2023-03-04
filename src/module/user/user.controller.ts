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
import { UserService } from './user.interface';
import { isNil } from 'lodash';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@app/database/entity/user.entity';
import { QueryMethods } from '@helper/query-methods';
import { UserQuery } from '@dto/user-query.dto';
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('user')
//TODO: refresh token route and method
export class UserController {
  private _queryMethods = new QueryMethods();
  private _logger = new Logger('USER_CONTROLLER');
  private readonly entity = 'User';
  // eslint-disable-next-line no-empty-function, no-unused-vars
  constructor(@Inject('UserService') private _userService: UserService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'return a list of user',
  })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
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
  @ApiNotFoundResponse()
  @ApiOkResponse({
    description: 'return the user found by provided ID',
  })
  @ApiQuery({
    name: 'id',
    type: String,
    required: true,
  })
  getUserByPK(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<User> {
    return this._userService
      .findByPK({
        id,
      })
      .then((result) => {
        if (isNil(result)) {
          throw new Error('NOTFOUND');
        }
        return result;
      })
      .catch((err: Error) => {
        this._logger.error(err);
        throw err;
      });
  }
}
