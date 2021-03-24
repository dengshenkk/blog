import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const isExistTag = await this.tagRepository.findOne({
      where: { tagName: createTagDto.tagName },
    });
    if (isExistTag) {
      throw new HttpException(`该标签[ ${createTagDto.tagName} ]已存在`, 400);
    }
    return await this.tagRepository.save(
      await this.tagRepository.create(createTagDto),
    );
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(id: number) {
    const tagItem = await this.tagRepository.findOne(id);
    if (!tagItem) {
      throw new HttpException(`该标签id[${id}]不存在`, 400);
    }
    return tagItem;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.findOne(id);
    return await this.tagRepository.update(id, updateTagDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.tagRepository.delete(id);
    if (result) {
      return null;
    }
  }
}
