import { Blog } from '../blogs/blog.entity';
import { File } from '../file/file.entity';
import { User } from '../users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Blog, (blogEntity) => blogEntity.comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'commentBlogId' })
  blog: Blog;

  @Column({ nullable: false })
  commentBlogId?: number;

  @ManyToOne(() => User, (userEntity) => userEntity.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'commentAuthorId' })
  author: User;

  @Column({ nullable: false })
  commentAuthorId?: number;

  @JoinColumn({ name: 'commentAttachmentId' })
  @OneToOne(() => File, { nullable: true })
  attachment?: File;

  @Column({ nullable: true })
  commentAttachmentId?: number;
}
