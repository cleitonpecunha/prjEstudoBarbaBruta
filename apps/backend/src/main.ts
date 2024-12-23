import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './error.filter';

async function bootstrap() {
  const port = process.env.PORT ?? 3001;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(port);
}
bootstrap();
