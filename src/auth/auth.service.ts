import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(email, password);

    if (user && user.password === password) {
      const payload = { username: user.userName, Sub: user.id };
      const accessToken = await this.jwtService.sign(payload);
      payload['token'] = accessToken;

      return payload;
    }
    return null;
  }
}
