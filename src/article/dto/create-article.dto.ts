import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { ArticleStatus } from '../entities/article.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ title: 'title', example: '一个好开头' })
  title: string;

  @ApiProperty({ title: 'content', example: '一段好内容' })
  content: string;

  @ApiProperty({ title: 'status', example: 1 })
  status: ArticleStatus;

  @ApiProperty({ title: 'summary', example: '一个小结' })
  summary: string;

  @ApiProperty({ title: 'coverURL', example: '一张好图' })
  coverURL: string;

  @ApiProperty({ title: 'categories', example: '一个好分类' })
  category: Category;

  @ApiProperty({ title: 'tags', example: [1] })
  tags: Tag[];
}
