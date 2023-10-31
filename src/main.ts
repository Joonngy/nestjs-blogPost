import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { createDocument } from './swagger/swagger';
import { ConfigService } from './config/config.service';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(morgan('dev')); /* For Log*/

  SwaggerModule.setup('api/v1', app, createDocument(app));
  const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
  await app.listen(port);
}
bootstrap();
