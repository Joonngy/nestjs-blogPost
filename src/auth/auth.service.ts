import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(email);

    if (user && (await compare(password, user.password))) {
      console.log(user);

      const payload = { username: user.userName, Sub: user.id };
      const accessToken = await this.jwtService.sign(payload);
      payload['token'] = accessToken;

      return payload;
    }

    return null;
  }
}
