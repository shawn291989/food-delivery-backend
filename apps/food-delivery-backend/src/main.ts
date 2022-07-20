import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Food Delivery Banckend')
    .setDescription(
      'Api contains food delivery features',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('/api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(port);
  logger.log(`App start on port ${port}`);
}
bootstrap();
