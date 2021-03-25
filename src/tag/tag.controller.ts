import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto)
  }

  @Get()
  findAll() {
    return this.tagService.findAll()
  }

  @Get('/page')
  findPage(@Query('pageNum') pageNum, @Query('pageSize') pageSize) {
    return this.tagService.findPage(+pageNum, +pageSize)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id)
  }
}
