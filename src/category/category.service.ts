import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isExistCategory = await this.categoryRepository.findOne({
      where: { categoryName: createCategoryDto.categoryName },
    });
    if (isExistCategory) {
      throw new HttpException(
        `该分类[ ${createCategoryDto.categoryName} ]已存在`,
        400,
      );
    }
    return await this.categoryRepository.save(
      await this.categoryRepository.create(createCategoryDto),
    );
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findByName(name: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        categoryName: name,
      },
    });
    if (!category) {
      throw new HttpException(`该分类[${name}]不存在`, 400);
    }
    return category;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new HttpException(`该分类[ ${id} ]不存在`, 400);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.categoryRepository.delete(id);
  }
}
