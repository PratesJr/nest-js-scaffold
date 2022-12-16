import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LoginFrom } from './oauth-types.enum';
import { QueryParams } from './query-params.dto';

export class UserQuery extends QueryParams {
  @IsOptional()
  @IsEnum(LoginFrom)
  loginFrom?: LoginFrom;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  email?: string;
}
