import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ title: 'name', example: '一个好标签' })
  tagName: string;
}
