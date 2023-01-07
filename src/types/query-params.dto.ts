import { IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class QueryParams {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    required: false,
    type: Number,
  })
  limit?: string;
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    required: false,
    type: Number,
  })
  page?: string;
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    required: false,
    type: Number,
  })
  offset?: string;
}
