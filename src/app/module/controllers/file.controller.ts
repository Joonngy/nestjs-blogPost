import { Controller, Get, Param, ParseIntPipe, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { FileService } from '../services/file.service';
import { Readable } from 'stream';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';

@Controller('file')
@ApiTags('File API')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('')
  @ApiOperation({ summary: 'Read All Avatar ID', description: 'Contains List of Files' })
  async getFileList() {
    return await this.fileService.getFileList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read Avatar ID', description: 'Contains Image of The Avatar' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res: any) {
    const file = await this.fileService.getFileById(id);

    const stream = Readable.from(file.data);

    res.setHeader('Content-Type', 'image');
    res.setHeader('content-Disposition', `attachment; filename="${file.filename}"`);

    return new StreamableFile(stream);
  }
}
