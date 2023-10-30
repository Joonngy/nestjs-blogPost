import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { Category } from 'src/category/category.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { createReadStream } from 'fs';
import * as archiver from 'archiver';
import { Search, SearchBlogDto } from './dto/search-blog.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBlog(blogInfo: CreateBlogDto, req: any, files: Array<Express.Multer.File>): Promise<Blog> {
    const newBlog = new Blog();
    newBlog.name = blogInfo.name;
    newBlog.status = blogInfo.status;
    newBlog.content = blogInfo.content;
    newBlog.author = await this.userRepository.createQueryBuilder().select('userEntity').from(User, 'userEntity').where('userEntity.id = :id', { id: req.user.userId }).getOne();
    newBlog.authorId = req.user.userId;

    const categoryNames: string[] = blogInfo.categoryNames.split(',');
    const categories: Category[] = [];

    for (const c of categoryNames) {
      let result = await this.categoryRepository.createQueryBuilder().select('categoryEntity').from(Category, 'categoryEntity').where('categoryEntity.name = :name', { name: c }).getOne();
      if (result === null) {
        await this.categoryRepository.createQueryBuilder().insert().into(Category).values({ name: c }).execute();
        result = await this.categoryRepository.createQueryBuilder().select('categoryEntity').from(Category, 'categoryEntity').where('categoryEntity.name = :name', { name: c }).getOne();
      }
      categories.push(result);
    }

    newBlog.category = categories;
    newBlog.id = blogInfo.id;

    for (const f of files) {
      newBlog.originalName.push(f.originalname);
      newBlog.savedPath.push(f.destination + '/' + f.filename);
    }

    return await this.blogRepository.save(newBlog);
  }

  async findAll(): Promise<Blog[]> {
    const result = this.blogRepository.find();

    if (result == null) {
      throw new BadRequestException('ID Does not exist');
    }

    return result;
  }

  async findById(id: number): Promise<Blog> {
    const result = await this.blogRepository.findOneBy({ id });

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    return result;
  }

  async findBySearch(searchDto: SearchBlogDto): Promise<Blog[]> {
    let result: Blog[];
    if (searchDto.search === Search.TITLE) {
      result = await this.blogRepository.findBy({ name: searchDto.name });
    } else if (searchDto.search === Search.AUTHOR) {
      result = await this.blogRepository.find({
        relations: {
          author: true,
        },
      });
    }

    if (result == null) {
      throw new BadRequestException('Author Does not exist');
    }

    const finalResult: Blog[] = [];
    for (const r of result) {
      if (r.status === 'true') {
        finalResult.push(r);
      }
    }

    if (finalResult == null) {
      throw new BadRequestException('Author Does not exist');
    }
    return finalResult;
  }

  async findMyBlog(req: any): Promise<Blog[]> {
    const result = await this.blogRepository.findBy({ author: req.user.username });

    if (result == null) {
      throw new BadRequestException('Author Does not exist');
    }

    return result;
  }

  async findByIdDownloadZip(id: number, res: any): Promise<Blog> {
    const result = await this.blogRepository.findOneBy({ id });

    if (result == null) {
      throw new BadRequestException('BlogID does not exist');
    }

    const files = [];

    if (result.savedPath.length > 0) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('content-Disposition', 'attachment; filename=attachment.zip');
    } else {
      throw new BadRequestException('No Attachments to Download');
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

  async findByIdDownloadFile(id: number, name: string, res: any): Promise<Blog> {
    const result = await this.blogRepository.findOneBy({ id });

    if (result == null) {
      throw new BadRequestException('ID does not exist');
    }

    let flag = false;
    for (let i = 0; i < result.savedPath.length; i++) {
      if (name === result.originalName[i]) {
        res.setHeader('Content-disposition', `attachment; filename=${result.originalName[i]}`);
        const file = createReadStream(result.savedPath[i]);
        file.pipe(res);
        flag = true;
      }
    }

    if (flag == false) throw new BadRequestException('No Attachments to Download');

    return result;
  }

  async update(id: number, req: any, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id: id } });

    if (blog == null) {
      throw new BadRequestException('Blog Post does not exist');
    }

    if (blog.author !== req.user.username) {
      throw new BadRequestException('No Authorization to Update This Post');
    }

    this.blogRepository.merge(blog, updateBlogDto);
    const result = this.blogRepository.save(blog);

    if (result == null) {
      throw new BadRequestException('Cannot Update');
    }

    return result;
  }

  async remove(id: number, req): Promise<boolean> {
    const blog = await this.blogRepository.findOne({ where: { id: id } });

    if (blog == null) {
      throw new BadRequestException('Blog Post does not exist');
    }

    if (blog.author !== req.user.username) {
      throw new BadRequestException('No Authorization to Remove This Post');
    }

    await this.blogRepository.remove(blog);

    return true;
  }
}
