import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { BasicEntity } from '../../basic/entities/basic.entity';

export enum ArticleStatus {
  Verifying = 1, // 审核中
  VerifySuccess = 2, // 审核通过
  VerifyFail = 3, // 审核未通过
}

@Entity()
export class Article extends BasicEntity {
  @Column('int')
  status: ArticleStatus;

  @Column('text', { nullable: true, default: null })
  content: string;

  @Column('varchar', { length: 500, nullable: true, default: null })
  summary: string;

  @Column('varchar', {
    name: 'cover_url',
    length: 500,
    nullable: true,
    default: null,
  })
  coverURL: string;

  // @ManyToOne(() => Category)
  // //  @JoinTable()
  // @JoinTable({
  //   name: 'article_category',
  //   joinColumn: {
  //     name: 'article_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'category_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // categories: Category;

  @ManyToOne(() => Category, (category) => category.article)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  // @JoinTable({
  //   name: 'article_tag',
  //   joinColumn: {
  //     name: 'article_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'tag_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
