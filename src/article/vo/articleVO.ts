import { Tag } from 'src/tag/entities/tag.entity'
import { Category } from '../../category/entities/category.entity'
import { ArticleStatus } from '../entities/article.entity'

export class ArticleVO {
  tags: Tag[]
  category: Category

  title: string

  content: string

  status: ArticleStatus

  summary: string

  coverURL: string

  constructor(
    tags: Tag[],
    category: Category,
    title: string,
    content: string,
    status: ArticleStatus,
    summary: string,
    coverURL: string
  ) {
    this.tags = tags
    this.category = category
    this.title = title
    this.content = content
    this.status = status
    this.summary = summary
    this.coverURL = coverURL
  }
}
