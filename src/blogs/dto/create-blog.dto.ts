import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  readonly id: number;

  @ApiProperty({
    example: 'NestJS Introduction',
    description: 'Title of the blog post',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Lorem Ipsum....',
    description: 'Content of the blog post',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'NestJS',
    description: '[Array of Strings] Category of the blog post',
  })
  @IsString({ each: true })
  categoryNames: string;
}
