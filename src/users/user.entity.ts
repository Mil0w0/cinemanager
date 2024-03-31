import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surname: string;

  @Column()
  firstName: string;

  @Column()
  birthDate: Date;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;
}
