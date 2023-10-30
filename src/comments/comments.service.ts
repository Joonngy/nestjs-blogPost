import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcMethod } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './comments.entity';
import { UserEntity } from '../users/user.entity';
import { BlogEntity } from '../blogs/blog.entity';
import { FileService } from '../file/file.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    private readonly databaseFilesService: FileService,
  ) {}

  @GrpcMethod()
  async create(userId: number, commentDto: CreateCommentDto, fileBuffer: Buffer, filename: string) {
    console.log('Create Comments');

    const readUser = await this.userRepository.findOneBy({ id: userId });

    if (readUser == null) {
      throw new BadRequestException('User does not exist');
    }

    const readBlog = await this.blogRepository.findOneBy({ id: commentDto.blogId });

    if (readBlog == null) {
      throw new BadRequestException('Blog does not exist');
    }

    const newComment = new CommentEntity();
    newComment.comment = commentDto.comment;
    newComment.author = readUser;
    newComment.commentAuthorId = readUser.id;
    newComment.blog = readBlog;
    newComment.commentBlogId = readBlog.id;
    console.log(fileBuffer, filename);
    if (filename !== null) {
      const attachment = await this.databaseFilesService.uploadDatabaseFile(fileBuffer, filename);

      if (attachment == null) {
        throw new BadRequestException('Cannot Add Attachment');
      }

      newComment.attachment = attachment;
    }

    console.log('Save');
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

  update(id: number, updateCommentDto: UpdateCommentDto) {
    console.log(updateCommentDto);
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
