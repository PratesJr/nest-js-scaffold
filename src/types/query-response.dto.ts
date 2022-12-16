import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class QueryResponse {
  @IsNotEmpty()
  @IsArray()
  data: any[];
  @IsNotEmpty()
  @IsNumber()
  count: number;
  @IsNotEmpty()
  @IsNumber()
  page: number;
}
