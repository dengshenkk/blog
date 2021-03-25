import { Article } from 'src/article/entities/article.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BasicEntity } from '../../common/entities/basic.entity'

export enum CommentStatus {
  Verifying = 1, // 审核中
  VerifySuccess = 2, // 审核通过
  VerifyFail = 3 // 审核未通过
}

@Entity()
export class Comment extends BasicEntity {
  @Column({ length: 20 })
  title: string

  @Column({ length: 2000 })
  content: string

  @Column('int')
  status: CommentStatus

  @ManyToOne((type) => Article, (article) => article.comments)
  @JoinColumn()
  article: Article
}
