import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  readonly id: number;

  @ApiProperty({
    example: 1,
    description: 'Id of the blog Post to add Comment',
  })
  @IsNumber()
  blogId: number;

  @ApiProperty({
    example: 'NestJS Introduction',
    description: 'Comment of the blog post',
  })
  @IsString()
  comment: string;

  @ApiProperty({
    type: 'file',
    format: 'binary',
    description: 'Any file can be uploaded',
    required: false,
  })
  file: any;
}
