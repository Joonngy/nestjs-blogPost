import { Blog } from 'src/app/modules/entity/blog.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Blog, (blogEntity) => blogEntity.category, {
    onDelete: 'CASCADE',
  })
  blog: Blog[];
}
