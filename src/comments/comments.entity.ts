import { BlogEntity } from '../blogs/blog.entity';
import { FileEntity } from '../file/file.entity';
import { UserEntity } from '../users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => BlogEntity, (blogEntity) => blogEntity.comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'commentBlogId' })
  blog: BlogEntity;

  @Column({ nullable: false })
  commentBlogId?: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'commentAuthorId' })
  author: UserEntity;

  @Column({ nullable: false })
  commentAuthorId?: number;

  @JoinColumn({ name: 'commentAttachmentId' })
  @OneToOne(() => FileEntity, { nullable: true })
  attachment?: FileEntity;

  @Column({ nullable: true })
  commentAttachmentId?: number;
}
