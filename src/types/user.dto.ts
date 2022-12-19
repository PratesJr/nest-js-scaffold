import { LoginFrom } from './oauth-types.enum';

export class UserDto {
  name: string;
  email: string;
  loginFrom: LoginFrom;
}
