import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Screening } from '../screenings/screening.entity';
import { User } from '../users/user.entity';
import { TicketType } from '../ticketTypes/ticketType.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entriesLeft: number;

  @ManyToOne(() => TicketType, (ticketType: TicketType) => ticketType.tickets)
  ticketType: TicketType;

  @ManyToMany(() => Screening, (screening: Screening) => screening.tickets)
  screenings: Screening[];

  @OneToMany(() => User, (user: User) => user.tickets)
  user: User;
}
