import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Screening } from '../screenings/screening.entity';

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

  @OneToMany(() => Screening, (screening: Screening) => screening.movie)
  screenings: Screening[];
}
