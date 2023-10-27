import { BlogEntity } from 'src/blogs/blog.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => BlogEntity, (blogEntity) => blogEntity.category, {
    onDelete: 'CASCADE',
  })
  blog: BlogEntity[];
}
