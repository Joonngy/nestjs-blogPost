import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum Status {
  PUBLIC = 'true',
  PRIVATE = 'false',
}

export class CreateBlogDto {
  readonly id: number;

  @ApiProperty({
    example: 'NestJS Introduction',
    description: 'Title of the blog post',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'enum',
    description: 'Visibility of the Blog Post',
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    example: 'Lorem Ipsum....',
    description: 'Content of the blog post',
  })
  @IsString()
  content: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      example: 'NestJS',
      description: 'Category of the blog post',
    },
    required: false,
  })
  @IsString()
  categoryNames: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'file',
      format: 'binary',
      description: 'Any file can be uploaded',
    },
    required: false,
  })
  file: any;
}
