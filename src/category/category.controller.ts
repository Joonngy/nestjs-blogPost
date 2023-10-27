import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category API')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add a Category', description: 'Add a unique category' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  })
  async create(@Body('id') id: number, @Body('name') name: string) {
    return await this.categoryService.create(id, name);
  }

  @Get()
  @ApiOperation({ summary: 'Read All Category', description: 'Read all Names of Category' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read Category by ID', description: 'Read all Names of Category' })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Category of Requested ID', description: 'Updates the Name of Category' })
  async update(@Param('id') id: string, @Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.update(+id, createCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Category of Requested ID', description: 'Delete the Name of Category' })
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(+id);
  }
}
