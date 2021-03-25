import { Column, Entity } from 'typeorm'
import { BasicEntity } from '../../common/entities/basic.entity'

@Entity()
export class Tag extends BasicEntity {
  @Column()
  tagName: string
}
