import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ title: 'name', example: '一个好分类' })
  categoryName: string;
}
