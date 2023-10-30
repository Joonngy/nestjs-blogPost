import { ApiProperty } from '@nestjs/swagger';

export class AddAvatarDto {
  @ApiProperty({
    type: 'file',
    format: 'binary',
    description: 'Add Image File to Upload',
    required: true,
  })
  file: any;
}
