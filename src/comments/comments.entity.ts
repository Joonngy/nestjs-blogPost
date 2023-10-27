import { BlogEntity } from '../blogs/blog.entity';
import { FileEntity } from '../file/file.entity';
import { UserEntity } from '../users/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @JoinColumn({ name: 'commentBlogPost' })
  @OneToOne(() => BlogEntity, { nullable: false })
  blogPost: BlogEntity;

  @JoinColumn({ name: 'commentAuthor' })
  @OneToOne(() => UserEntity, { nullable: false })
  author: UserEntity;

  @JoinColumn({ name: 'commentAttachment' })
  @OneToOne(() => FileEntity, { nullable: true })
  attachment?: FileEntity;
}
