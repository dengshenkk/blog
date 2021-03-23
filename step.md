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
```javascript

```

