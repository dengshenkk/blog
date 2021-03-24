1. install

```shell
npm i mysql typeorm typeorm-naming-strategies @nestjs/typeorm @nestjs/config  -S
```

2. 建立实体

```javascript
export class xxEntity extends BasicEntity {
}
```

3. 引入swagger-ui并配置

```shell
npm i @nestjs/swagger swagger-ui-express -D
```

```javascript
// main.ts
const options = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);

// localhost:3000/api
```

4. 完善实体和dto信息


5. 使用拦截器统一处理返回值

```typescript

@Injectable()
export class InterceptorResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = response.statusCode;
        const url = request.originalUrl;
        const res = {
          statusCode,
          url,
          msg: '操作成功',
          success: true,
          data,
        };
        return res;
      }),
    );
  }
}
```

6. 统一异常处理
```typescript

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      message: exception.response,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      body: request.body,
    });
  }
}

```
