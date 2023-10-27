import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    example: 'joonnngy@dnsevercorp.com',
    description: 'Input Email',
  })
  email: string;
  @ApiProperty({
    example: 'Password1!',
    description: 'Input Password',
  })
  password: string;
}
