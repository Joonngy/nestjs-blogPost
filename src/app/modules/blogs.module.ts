import { Module } from '@nestjs/common';
import { BlogsService } from './services/blogs.service';
import { BlogsController } from './controllers/blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Blog } from './entity/blog.entity';
import { Category } from './entity/category.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Category, User]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
