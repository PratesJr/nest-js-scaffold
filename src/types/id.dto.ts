import { IsNotEmpty, IsUUID } from 'class-validator';

export class Id {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
