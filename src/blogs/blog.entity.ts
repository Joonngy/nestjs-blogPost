import BaseEntity from '../model/base.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from 'src/users/user.entity';
import { CommentEntity } from 'src/comments/comments.entity';

@Entity()
export class BlogEntity extends BaseEntity {
  @CreateDateColumn()
  created;

  @UpdateDateColumn()
  updated;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.blog, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;

  @Column({ nullable: false })
  authorId: number;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
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

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.blog, {
    nullable: true,
  })
  comment: CommentEntity[];

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
