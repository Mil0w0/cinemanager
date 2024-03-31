import { Picture } from 'src/pictures/picture.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column()
  isAvailable: boolean;

  @Column()
  hasDisabledAccess: boolean;

  @OneToMany(() => Picture, (picture) => picture.id)
  pictures: Picture[];
}
