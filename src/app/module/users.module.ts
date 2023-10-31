import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { FileModule } from 'src/app/module/file.module';
import { User } from './entity/user.entity';
import { File } from 'src/app/module/entity/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, File]), FileModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
