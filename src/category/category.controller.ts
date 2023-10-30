import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category API')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  @ApiOperation({ summary: 'Add a Category', description: 'Add a unique category' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async create(@Body() categoryInfo: CreateCategoryDto) {
    return await this.categoryService.create(categoryInfo);
  }

  @Get('')
  @ApiOperation({ summary: 'Read All Category', description: 'Read all Names of Category' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Read Category by ID', description: 'Read all Names of Category' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async findOne(@Param('name') name: string) {
    return await this.categoryService.findOne(name);
  }

  @Patch(':name')
  @ApiOperation({ summary: 'Update Category of Requested ID', description: 'Updates the Name of Category' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async update(@Param('name') name: string, @Body() updateDto: UpdateCategoryDto) {
    return await this.categoryService.update(name, updateDto);
  }

  @Delete(':name')
  @ApiOperation({ summary: 'Delete Category of Requested ID', description: 'Delete the Name of Category' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async remove(@Param('name') name: string) {
    return await this.categoryService.remove(name);
  }
}
