import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentEntity } from './comments.entity';
import { FileEntity } from '../file/file.entity';
import { FileModule } from '../file/file.module';
import { UserEntity } from '../users/user.entity';
import { BlogEntity } from '../blogs/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, FileEntity, UserEntity, BlogEntity]), FileModule],

  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
