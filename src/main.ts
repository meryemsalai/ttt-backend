import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env.PORT) || 3000;

  // IMPORTANT for Railway:
  await app.listen(port, '0.0.0.0');

  console.log(`✅ Listening on port ${port}`);
}
bootstrap();

