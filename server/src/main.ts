import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/booking/api/docs", app, documentFactory);

  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix("/booking/api/");

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
