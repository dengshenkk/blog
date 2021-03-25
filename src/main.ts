import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { InterceptorResponseInterceptor } from './common/interceptor/response'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 开启cors跨域
  app.enableCors()

  // 统一拦截处理返回值
  app.useGlobalInterceptors(new InterceptorResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000)
}

bootstrap()
