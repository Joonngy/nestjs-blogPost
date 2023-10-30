import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './app/modules/blogs.module';
import { CategoryModule } from './app/modules/category.module';
import authConfig from './config/authConfig';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './app/modules/users.module';
import { AuthModule } from './app/auth/auth.module';
import { dataSourceOptions } from 'src/migrations/data-source';
import { FileModule } from './app/modules/file.module';
import { CommentsModule } from './app/modules/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
      load: [authConfig],
      validationSchema,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    BlogsModule,
    CategoryModule,
    FileModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
