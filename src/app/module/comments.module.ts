import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { FileModule } from './file.module';
import { Comment } from './entity/comments.entity';
import { File } from './entity/file.entity';
import { User } from './entity/user.entity';
import { Blog } from './entity/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, File, User, Blog]), FileModule],

  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
