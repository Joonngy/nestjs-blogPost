import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
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
  app.use(morgan('dev'));

  const config = new DocumentBuilder()
    .setTitle('BLOG API')
    .setVersion('1.0')
    .setDescription('For API Documentation')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/api-docs`, app, document, {
    customSiteTitle: 'BLOG API',
  });

  const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
  await app.listen(port);
}
bootstrap();
