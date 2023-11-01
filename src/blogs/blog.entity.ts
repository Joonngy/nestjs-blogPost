import Base from '../model/base.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comments.entity';

@Entity()
export class Blog extends Base {
  @CreateDateColumn()
  created;

  @UpdateDateColumn()
  updated;

  @ManyToOne(() => User, (userEntity) => userEntity.blog, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

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

  @OneToMany(() => Comment, (commentEntity) => commentEntity.blog, {
    nullable: true,
  })
  comment: Comment[];

  @ManyToMany(() => Category, (categoryEntity) => categoryEntity.blog)
  @JoinTable({
    name: 'blog_category',
    joinColumn: {
      name: 'blog_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  category: Category[];
}
