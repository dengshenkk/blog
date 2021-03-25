import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
import { TagModule } from '../tag/tag.module'
import { CategoryModule } from '../category/category.module'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), TagModule, CategoryModule],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
