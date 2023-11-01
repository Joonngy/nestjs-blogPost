import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './blogs/blogs.module';
import { CategoryModule } from './category/category.module';
import authConfig from './config/authConfig';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './db/data-source';
import { FileModule } from './file/file.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/.env.${process.env.NODE_ENV}`,
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
