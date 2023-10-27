import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcMethod } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  @GrpcMethod()
  async create(userId: number, commentDto: CreateCommentDto) {
    const newComment = new CommentEntity();
    newComment.comment = commentDto.comment;
    // newComment.author =
    // newComment.attachment =
    // newComment.blogPost =

    const result = await this.commentsRepository.save(newComment);

    //Exception

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
