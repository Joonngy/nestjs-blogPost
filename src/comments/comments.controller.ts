import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
@ApiTags('Comments API')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @MessagePattern('createComment')
  @ApiOperation({ summary: 'Creates Comment', description: 'Insert Comment into a Blog Post including Author' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(@Payload() createCommentDto: CreateCommentDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (file === undefined) {
      return this.commentsService.create(req.user.userId, createCommentDto, null, null);
    } else {
      return this.commentsService.create(req.user.userId, createCommentDto, file.buffer, file.originalname);
    }
  }

  @Get()
  @MessagePattern('findAllComments')
  findAll() {
    return this.commentsService.findAll();
  }

  @MessagePattern('findOneComment')
  findOne(@Payload() id: number) {
    return this.commentsService.findOne(id);
  }

  @MessagePattern('updateComment')
  update(@Payload() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto.id, updateCommentDto);
  }

  @MessagePattern('removeComment')
  remove(@Payload() id: number) {
    return this.commentsService.remove(id);
  }
}
