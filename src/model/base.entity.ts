import { Column, PrimaryGeneratedColumn } from 'typeorm';

abstract class Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default Base;
