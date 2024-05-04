import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  // Montant peut être positif ou négatif
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.transactions)
  user: User;
}
