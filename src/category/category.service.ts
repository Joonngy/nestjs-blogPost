import { BadRequestException, Injectable } from '@nestjs/common';
import * as typeorm from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @typeorm.InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(id: number, name: string): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.id = id;
    category.name = name;

    const result = await this.categoryRepository.save(category);

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    return result;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const result = await this.categoryRepository.find();

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    return result;
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const result = await this.categoryRepository.findOneBy({ id });

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    return result;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    console.log(updateCategoryDto);

    const blog = await this.categoryRepository.findOne({ where: { id } });

    if (blog == null) {
      throw new BadRequestException('Id does not exist');
    }
    // this.blogRepository.update
    this.categoryRepository.merge(blog, updateCategoryDto);
    const result = this.categoryRepository.save(blog);

    if (result == null) {
      throw new BadRequestException('Cannot Save');
    }

    return result;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);

    if (result == null) {
      throw new BadRequestException('Cannot Delete');
    }

    return true;
  }
}
