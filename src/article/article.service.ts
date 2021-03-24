import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleVO } from './vo/articleVO';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const tags = [];
    for (const tag of createArticleDto.tags) {
      const tagItem = await this.tagService.findOne(tag);
      tags.push(tagItem);
    }
    const category = await this.categoryService.findOne(
      createArticleDto.category,
    );
    const { title, content, status, summary, coverURL } = createArticleDto;
    const articleVO = new ArticleVO(
      tags,
      category,
      title,
      content,
      status,
      summary,
      coverURL,
    );
    return await this.articleRepository.save(
      this.articleRepository.create(articleVO),
    );
  }

  async findAll() {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.category', 'category');
    const [data, count] = await query.getManyAndCount();

    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw HttpException;
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    // return await this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articleRepository.delete(id);
  }
}
