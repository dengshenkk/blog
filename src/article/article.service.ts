import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    console.log('createArticleDto: ', createArticleDto);
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
