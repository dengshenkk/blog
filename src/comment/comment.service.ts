import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.save(
      this.commentRepository.create(createCommentDto)
    )
  }

  async findAll() {
    return await this.commentRepository.find()
  }

  async findOne(id: number) {
    return await this.commentRepository.findOne(id)
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update(id, updateCommentDto)
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id)
  }

  async findPage(page: Page) {
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .skip((page.pageNum - 1) * page.pageSize)
      .take(page.pageSize)
    const [data, count] = await query.getManyAndCount()
    return {
      count,
      data
    }
  }
}

interface Page {
  pageNum: number
  pageSize: number
}
