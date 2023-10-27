import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  readonly id: number;

  @ApiProperty({
    example: 'joonnngy',
    description: 'Input Username',
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'password',
    description: 'Input Password',
  })
  @IsString()
  password: string;
}
