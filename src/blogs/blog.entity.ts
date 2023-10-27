import BaseEntity from '../base.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

@Entity()
export class BlogEntity extends BaseEntity {
  @CreateDateColumn()
  created;

  @UpdateDateColumn()
  updated;

  @Column()
  content: string;

  @Column({
    type: 'simple-array',
    default: [],
    nullable: true,
  })
  originalName: string[] = [];

  @Column({
    type: 'simple-array',
    default: [],
    nullable: true,
  })
  savedPath: string[] = [];

  @ManyToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.blog)
  @JoinTable({
    name: 'blog_category',
    joinColumn: {
      name: 'blog_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  category: CategoryEntity[];
}
