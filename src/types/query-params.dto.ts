import { IsNumberString, IsOptional } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';

export class QueryParams {
  @IsOptional()
  @IsUUID(4)
  id?: string;
  @IsOptional()
  @IsNumberString()
  limit?: string;
  @IsOptional()
  @IsNumberString()
  page?: string;
  @IsOptional()
  @IsNumberString()
  offset?: string;
}
