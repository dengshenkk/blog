import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagService: TagService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const tags = [];
    for (const tag of createArticleDto.tags) {
      await tags.push(this.tagService.findOne((tag)));
    }
    console.log('createArticleDto: ', createArticleDto);
    createArticleDto.tags = tags;
    return await this.articleRepository.save(
      this.articleRepository.create(createArticleDto),
    );
  }

  async findAll() {
    const query = this.articleRepository
      .createQueryBuilder('article')
      // .leftJoinAndSelect('article.tags', 'tags')
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
    return await this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articleRepository.delete(id);
  }
}
