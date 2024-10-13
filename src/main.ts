import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');
  //! Validación a nivel global en base a los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Tranforma lo que llega en los parametros como string y deben ser numeros a numeros
      transformOptions:  {
        enableImplicitConversion: true
      }
    }),
  )

  await app.listen(3000);
}
bootstrap();
