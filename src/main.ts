import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaErrorFilter } from './db-prisma/prisma-errors/prisma-errors';
import { setupSwagger } from './helpers/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new PrismaErrorFilter());
  app.enableCors({
    origin: '',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  setupSwagger(app);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;
  await app.listen(PORT);
}
bootstrap();
