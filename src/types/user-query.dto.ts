import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LoginFrom } from './oauth-types.enum';
import { QueryParams } from './query-params.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UserQuery extends QueryParams {
  @IsOptional()
  @IsEnum(LoginFrom)
  @ApiProperty({
    required: false,
    type: LoginFrom,
  })
  loginFrom?: LoginFrom;
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
  })
  name?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
  })
  email?: string;
}
