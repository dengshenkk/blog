import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { TagModule } from './tag/tag.module'
import { CategoryModule } from './category/category.module'
import { CommentModule } from './comment/comment.module'
import { TypeOrmModule } from '@nestjs/typeorm'
// 实体驼峰转下划线
import { SnakeNamingStrategy } from 'typeorm-naming-strategies/snake-naming.strategy'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'haijinsha.top',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest-dev',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      logger: 'advanced-console',
      logging: 'all',
      // 命名策略 实体驼峰转下划线
      namingStrategy: new SnakeNamingStrategy()
    }),
    ArticleModule,
    TagModule,
    CategoryModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
