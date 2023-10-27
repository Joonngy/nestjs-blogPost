import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  readonly id: number;

  @ApiProperty({
    example: 'NestJs',
    description: 'Name of Category',
  })
  @IsString()
  name: string;
}
