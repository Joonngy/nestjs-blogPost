import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcMethod } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comments.entity';
import { User } from '../users/user.entity';
import { Blog } from '../blogs/blog.entity';
import { FileService } from '../file/file.service';
import { FileInfo } from './comments.controller';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly databaseFilesService: FileService,
  ) {}

  @GrpcMethod()
  async create(userId: number, commentDto: CreateCommentDto, fileInfo: FileInfo) {
    const readUser = await this.userRepository.findOneBy({ id: userId });

    if (readUser == null) {
      throw new BadRequestException('User does not exist');
    }

    const readBlog = await this.blogRepository.findOneBy({ id: commentDto.blogId });

    if (readBlog == null) {
      throw new BadRequestException('Blog does not exist');
    }

    const newComment = new Comment();
    newComment.comment = commentDto.comment;
    newComment.author = readUser;
    newComment.commentAuthorId = readUser.id;
    newComment.blog = readBlog;
    newComment.commentBlogId = readBlog.id;
    if (fileInfo !== undefined) {
      const attachment = await this.databaseFilesService.uploadDatabaseFile(fileInfo.fileBuffer, fileInfo.fileOriginalName);

      if (attachment == null) {
        throw new BadRequestException('Cannot Add Attachment');
      }

      newComment.attachment = attachment;
    }

    const result = await this.commentsRepository.save(newComment);

    if (result == null) {
      throw new BadRequestException('Cannot Save Comment');
    }
    return newComment;
  }

  @GrpcMethod()
  async findAll() {
    const data = await this.commentsRepository.find();
    return {
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
