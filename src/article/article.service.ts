import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { UpdateArticleDto } from './dto/update-article.dto';

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
      if (!tagItem) {
        throw new HttpException(`该标签id[${tag}]不存在`, 400);
      }
      tags.push(tagItem);
    }

    const category = await this.categoryService.findOne(
      createArticleDto.category,
    );
    const article = new Article();
    article.category = category;
    article.tags = tags;
    article.content = createArticleDto.content;
    article.coverURL = createArticleDto.coverURL;
    article.status = createArticleDto.status;
    article.summary = createArticleDto.summary;
    article.title = createArticleDto.title;
    return await this.articleRepository.save(
      this.articleRepository.create(article),
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
    return await this.articleRepository.findOne(id);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    // return await this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articleRepository.delete(id);
  }
}
