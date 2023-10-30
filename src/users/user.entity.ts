import { Blog } from 'src/blogs/blog.entity';
import { Comment } from 'src/comments/comments.entity';
import { File } from 'src/file/file.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 60, unique: true })
  userName: string;

  @Column({ length: 90 })
  password: string;

  @OneToMany(() => Comment, (commentEntity) => commentEntity.author, {
    nullable: true,
  })
  comments: Comment[];

  @OneToMany(() => Blog, (blogEntity) => blogEntity.author, {
    nullable: true,
  })
  blog: Blog[];

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => File, { nullable: true })
  avatar?: File;

  @Column({ nullable: true })
  avatarId?: number;
}
