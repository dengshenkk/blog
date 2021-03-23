import { Column, Entity } from 'typeorm';
import { BasicEntity } from '../../basic/entities/basic.entity';

@Entity()
export class Tag extends BasicEntity {
  @Column()
  name: string;
}
