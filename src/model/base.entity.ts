import { Column, PrimaryGeneratedColumn } from 'typeorm';

abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default BaseEntity;
