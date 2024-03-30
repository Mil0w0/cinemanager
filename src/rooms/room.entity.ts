import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
