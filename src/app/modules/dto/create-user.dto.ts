import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateUserDto {
  readonly id: number;

  @ApiProperty({
    example: 'joonnngy@dnsevercorp.com',
    description: 'Input Username',
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: 'joonnngy',
    description: 'Input Username',
  })
  @IsString()
  readonly userName: string;

  @ApiProperty({
    example: 'Password1!',
    description: 'Input Password',
  })
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
