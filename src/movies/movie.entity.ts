import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['title'])
  title: string;

  @Column()
  duration: number;

  @Column()
  releaseDate: Date;

  @Column()
  category: string;
}
