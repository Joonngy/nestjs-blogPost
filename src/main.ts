import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = '/api/v1';
  app.setGlobalPrefix(prefix);
  app.enableCors({
    allowedHeaders: 'Content-Type',
    methods: 'POST,GET,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // app.use(helmet());
  app.use(morgan('dev'));
  // app.use(cookieParser());

  const config = new DocumentBuilder().setTitle('BLOG API').setVersion('1.0').setDescription('For API Documentation').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/api-docs`, app, document, {
    customSiteTitle: 'BLOG API',
  });

  const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
  await app.listen(port);
}
bootstrap();
// http://localhost:3000/api/v1/api-docs