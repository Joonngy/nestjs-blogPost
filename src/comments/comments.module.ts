import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { FileModule } from '../file/file.module';
import { Comment } from './comments.entity';
import { File } from '../file/file.entity';
import { User } from '../users/user.entity';
import { Blog } from '../blogs/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, File, User, Blog]), FileModule],

  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
