import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';
import { Transaction } from '../transaction/trasaction.entity';

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

  @Column({
    nullable: true,
  })
  loginToken: string;

  @Column({
    default: 'user',
  })
  roles: string;

  @OneToMany(
    () => Transaction,
    (transaction: Transaction) => transaction.user,
    { eager: true },
  )
  transactions: Transaction[];

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.user)
  tickets: Ticket[];
}
