import { LoginFrom } from './oauth-types.enum';

export class UserDto {
  id: string;
  name: string;
  email: string;
  loginFrom: LoginFrom;
}
