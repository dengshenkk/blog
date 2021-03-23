import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from '../../basic/entities/basic.entity';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class Category extends BasicEntity {
  @Column('varchar', { length: 200 })
  categoryName: string;

  @OneToMany(() => Article, (article) => article.category)
  article: Article;
}
