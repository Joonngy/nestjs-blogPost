import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum Search {
  TITLE = 'TITLE',
  AUTHOR = 'AUTHOR',
}

export class SearchBlogDto {
  @ApiProperty({
    example: 'NestJS Introduction',
    description: 'Title of the blog post',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'enum',
    description: 'Search Type',
    enum: Search,
  })
  @IsEnum(Search)
  search: Search;
}
