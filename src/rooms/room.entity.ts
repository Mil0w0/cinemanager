import { Picture } from 'src/pictures/picture.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Screening } from '../screenings/screening.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxCapacity: number;

  @Column()
  description: string;

  @Column({
    default: false,
  })
  isAvailable: boolean;

  @Column({
    default: false,
  })
  hasDisabledAccess: boolean;

  @Column({ default: 'standard' })
  type: string;

  @OneToMany(() => Picture, (picture) => picture.room)
  pictures: Picture[];

  @OneToMany(() => Screening, (screening) => screening.room)
  screenings: Screening[];
}
