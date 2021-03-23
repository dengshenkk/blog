import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InterceptorResponseInterceptor } from './basic/resetful/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 统一拦截处理返回值
  app.useGlobalInterceptors(new InterceptorResponseInterceptor());
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
