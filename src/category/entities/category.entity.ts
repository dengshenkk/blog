import { Column, Entity } from 'typeorm';
import { BasicEntity } from '../../basic/entities/basic.entity';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class Category extends BasicEntity {
  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 200 })
  article: Article;
}
