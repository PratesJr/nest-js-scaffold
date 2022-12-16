import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

export class QueryParams {
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
