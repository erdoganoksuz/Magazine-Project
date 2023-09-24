import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

const setUpSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Magazine Service')
    .setDescription('This API is responsible for CRUD operations of Magazines')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  setUpSwagger(app);
  app.enableCors();
  await app.listen(4000);
}

bootstrap();
