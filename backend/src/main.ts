import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/exception.filter';
import { AttachInterceptor } from './common/interceptors/attach.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: "*"
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );

  app.useGlobalFilters(
    new AllExceptionFilter()
  );

  app.useGlobalInterceptors(
    new AttachInterceptor()
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
