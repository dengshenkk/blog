import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ title: 'title', example: '一次' })
  title: string;

  @ApiProperty({ title: 'content', example: '亿点点内容' })
  content: string;

  @ApiProperty({ title: 'status', example: 1 })
  status: number;

  @ApiProperty({ title: 'articleId', example: 1 })
  articleId: string;
}
