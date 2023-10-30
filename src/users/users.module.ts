import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FileModule } from 'src/file/file.module';
import { User } from './user.entity';
import { File } from 'src/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, File]), FileModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
