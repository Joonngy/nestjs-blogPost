import { BlogEntity } from 'src/blogs/blog.entity';
import { FileEntity } from 'src/file/file.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 60, unique: true })
  userName: string;

  @Column({ length: 30 })
  password: string;

  @OneToMany(() => BlogEntity, (blogEntity) => blogEntity.author, {
    nullable: true,
  })
  blog: BlogEntity[];

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => FileEntity, { nullable: true })
  avatar?: FileEntity;

  @Column({ nullable: true })
  avatarId?: number;
}
