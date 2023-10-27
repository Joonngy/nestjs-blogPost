import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import * as typeorm from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UpdateBlogDto } from './dto/update-blog.dto';

import { BlogEntity } from './blog.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { createReadStream } from 'fs';
import * as archiver from 'archiver';

@Injectable()
export class BlogsService {
  constructor(
    @typeorm.InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @typeorm.InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createBlog(blogInfo: CreateBlogDto, files: Array<Express.Multer.File>): Promise<BlogEntity> {
    const newBlog = new BlogEntity();
    newBlog.name = blogInfo.name;
    newBlog.content = blogInfo.content;
    const categories: CategoryEntity[] = [];
    for (const c of blogInfo.categoryNames) {
      const result = await this.categoryRepository.createQueryBuilder().select('categoryEntity').from(CategoryEntity, 'categoryEntity').where('categoryEntity.name = :name', { name: c }).getOne();
      if (result !== null) {
        categories.push(result);
      }
    }
    newBlog.category = categories;
    newBlog.id = blogInfo.id;
    for (const f of files) {
      newBlog.originalName.push(f.originalname);
      newBlog.savedPath.push(f.destination + '/' + f.filename);
    }
    console.log(newBlog);
    return await this.blogRepository.save(newBlog);
  }

  async findAll(): Promise<BlogEntity[]> {
    const result = this.blogRepository.find();

    if (result == null) {
      throw new BadRequestException('ID Does not exist');
    }

    return result;
  }

  async findByName(name: string): Promise<BlogEntity[]> {
    const result = await this.blogRepository.findBy({ name });

    if (result == null) {
      throw new BadRequestException('Namit e does not exist');
    }

    return result;
  }

  async findById(id: number): Promise<BlogEntity> {
    const result = await this.blogRepository.findOneBy({ id });

    if (result == null) {
      throw new BadRequestException('ID Does not exist');
    }

    return result;
  }

  async findByIdDownloadZip(id: number, res: any): Promise<BlogEntity> {
    const result = await this.blogRepository.findOneBy({ id });

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    const files = [];

    if (result.savedPath.length > 0) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('content-Disposition', 'attachment; filename=attachment.zip');
    }

    for (let i = 0; i < result.savedPath.length; i++) {
      const object: { name: string; path: string } = {
        name: result.originalName[i],
        path: result.savedPath[i],
      };
      files.push(object);
    }

    const zip = archiver('zip');
    files.forEach((file) => zip.file(file.path, { name: file.name }));
    zip.pipe(res);
    zip.finalize();

    return result;
  }

  async findByIdDownloadFile(id: number, name: string, res: any): Promise<BlogEntity> {
    const result = await this.blogRepository.findOneBy({ id });

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    const flag = false;
    for (let i = 0; i < result.savedPath.length; i++) {
      if (name === result.originalName[i]) {
        console.log(name, result.originalName[i]);
        res.setHeader('Content-disposition', `attachment; filename=${result.originalName[i]}`);
        const file = createReadStream(result.savedPath[i]);
        console.log(file);
        file.pipe(res);
      }
    }

    if (flag == false) throw new BadRequestException('File does not exist');

    return result;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (blog == null) {
      throw new BadRequestException('Id does not exist');
    }

    this.blogRepository.merge(blog, updateBlogDto);
    const result = this.blogRepository.save(blog);

    if (result == null) {
      throw new BadRequestException('Cannot Save');
    }

    return result;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.blogRepository.delete(id);

    if (result == null) {
      throw new BadRequestException('Cannot Delete');
    }

    return true;
  }
}
