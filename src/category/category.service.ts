import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(categoryInfo: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryExist = await this.categoryRepository.findOne({ where: { name: categoryInfo.name } });

    if (categoryExist) {
      throw new UnprocessableEntityException('Category Name Already Exists');
    }

    const category = new CategoryEntity();
    category.id = categoryInfo.id;
    category.name = categoryInfo.name;

    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const result = await this.categoryRepository.find();

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    return result;
  }

  async findOne(name: string): Promise<CategoryEntity> {
    const result = await this.categoryRepository.findOne({ where: { name: name } });

    if (result == null) {
      throw new BadRequestException('Category does not exist');
    }

    return result;
  }

  async update(name: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { name: name } });

    if (category == null) {
      throw new BadRequestException('Category does not exist');
    }

    if ((await this.categoryRepository.findOne({ where: { name: updateCategoryDto.name } })) !== null) {
      throw new BadRequestException('Category Name is Duplicated');
    }

    this.categoryRepository.merge(category, updateCategoryDto);
    const result = this.categoryRepository.save(category);

    if (result == null) {
      throw new BadRequestException('Cannot Save the Category');
    }

    return result;
  }

  async remove(name: string): Promise<boolean> {
    console.log(name);
    const result = await this.categoryRepository.delete({ name: name });

    console.log(result);

    if (result.affected == 0) {
      throw new BadRequestException('No Category Found');
    }

    return true;
  }
}
