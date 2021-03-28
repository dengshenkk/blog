import { Column, Entity } from 'typeorm'
import { BasicEntity } from '../../common/entities/basic.entity'

@Entity('user')
export class User extends BasicEntity {
  @Column()
  name: string

  @Column({ nullable: true })
  avatar: string

  @Column()
  phone: string

  @Column()
  password: string
}
