import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TicketType } from '../ticketTypes/ticketType.entity';
import { Ticket } from '../tickets/ticket.entity';

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

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.user)
  tickets: Ticket[];
}
