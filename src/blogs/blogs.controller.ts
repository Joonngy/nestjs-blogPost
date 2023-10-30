import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Patch, Response, UseGuards, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SearchBlogDto } from './dto/search-blog.dto';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Blog } from './blog.entity';

@Controller('blogs')
@ApiTags('Blog API')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('')
  @ApiOperation({ summary: 'Uploads Blog Post', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  create(@Req() req: any, @Body() blogInfo: CreateBlogDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.blogsService.createBlog(blogInfo, req, files);
  }

  @Get()
  @ApiOperation({ summary: 'Read all Blog Posts', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findAll(): Promise<Blog[]> {
    return await this.blogsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read all Blog Posts of requested id', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findById(@Param('id') id: number): Promise<Blog> {
    return this.blogsService.findById(id);
  }

  @Get('type/option')
  @ApiOperation({ summary: 'Search Blog Posts of requested ENUM', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findBySearch(@Query() searchDto: SearchBlogDto): Promise<Blog[]> {
    return this.blogsService.findBySearch(searchDto);
  }

  @Get('my-blogs')
  @ApiOperation({ summary: 'Read All My Blog Post', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findMyBlog(@Req() req: any): Promise<Blog[]> {
    return await this.blogsService.findMyBlog(req);
  }

  @Get('attachment/:id')
  @ApiOperation({ summary: 'Read All Attachment from requested id Blog Post', description: 'Saves the Attachment' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findByIdDownloadZip(@Param('id') id: number, @Response() res): Promise<Blog> {
    return await this.blogsService.findByIdDownloadZip(id, res);
  }

  @Get('attachment/:id/:name')
  @ApiOperation({ summary: 'Read a specific Attachment from requested id Blog Post', description: 'Saves the Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findByIdDownloadFile(@Param('id') id: number, @Param('name') name: string, @Response() res): Promise<Blog> {
    return await this.blogsService.findByIdDownloadFile(id, name, res);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates the blog post', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async update(@Param('id') id: number, @Req() req: any, @Body() updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return await this.blogsService.update(id, req, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes the blog post', description: 'Contains Title, Contents, Categories and Attachments' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async remove(@Req() req: any, @Param('id') id: number): Promise<boolean> {
    return await this.blogsService.remove(id, req);
  }
}
