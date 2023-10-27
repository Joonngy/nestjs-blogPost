import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity';
import { FileModule } from 'src/file/file.module';
import { FileEntity } from 'src/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FileEntity]), FileModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
