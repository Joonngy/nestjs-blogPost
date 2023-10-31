import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './app/module/entity.module';

@Module({
  // imports: [
  //   ConfigModule.forRoot({
  //     isGlobal: true,
  //     envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
  //     load: [authConfig],
  //     validationSchema,
  //   }),
  //   TypeOrmModule.forRoot(dataSourceOptions),
  //   AuthModule,
  //   UsersModule,
  //   BlogsModule,
  //   CategoryModule,
  //   FileModule,
  //   CommentsModule,
  // ],
  imports: [ConfigModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
