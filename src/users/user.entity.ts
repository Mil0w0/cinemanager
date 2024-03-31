import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  loginToken: string;
}
