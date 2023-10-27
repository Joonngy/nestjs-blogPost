import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Patch, Response } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { BlogEntity } from './blog.entity';

@Controller('blogs')
@ApiTags('Blog API')
// @ApiBody('Everything about blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Uploads Blog Post', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        content: { type: 'string' },
        categoryName: { type: 'string[]' },
      },
    },
  })
  create(@Body() blogInfo: CreateBlogDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.blogsService.createBlog(blogInfo, files);
  }

  @Get()
  @ApiOperation({ summary: 'Read all Blog Posts', description: 'Contains Title, Contents, Categories and Attachments' })
  async findAll(): Promise<BlogEntity[]> {
    return await this.blogsService.findAll();
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Read all Blog Posts of requested title', description: 'Contains Title, Contents, Categories and Attachments' })
  findByTitle(@Param('name') name: string): Promise<BlogEntity[]> {
    return this.blogsService.findByName(name);
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Read a Blog Post of requested id', description: 'Contains Title, Contents, Categories and Attachments' })
  async findById(@Param('id') id: number): Promise<BlogEntity> {
    return await this.blogsService.findById(id);
  }

  @Get('id/:id/attachment')
  @ApiOperation({ summary: 'Read All Attachment from requested id Blog Post', description: 'Saves the Attachment' })
  async findByIdDownloadZip(@Param('id') id: number, @Response() res): Promise<BlogEntity> {
    return await this.blogsService.findByIdDownloadZip(id, res);
  }

  @Get('id/:id/attachment/:name')
  @ApiOperation({ summary: 'Read a specific Attachment from requested id Blog Post', description: 'Saves the Attachments' })
  async findByIdDownloadFile(@Param('id') id: number, @Param('name') name: string, @Response() res): Promise<BlogEntity> {
    return await this.blogsService.findByIdDownloadFile(id, name, res);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates the blog post', description: 'Contains Title, Contents, Categories and Attachments' })
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto): Promise<BlogEntity> {
    return await this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes the blog post', description: 'Contains Title, Contents, Categories and Attachments' })
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.blogsService.remove(+id);
  }
}
