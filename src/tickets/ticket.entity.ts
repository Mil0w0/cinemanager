import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  price: number;

  @Column()
  buyDate: Date;

  @ManyToOne(() => TicketType, (ticketType: TicketType) => ticketType.tickets)
  ticketType: TicketType;

  @ManyToMany(() => Screening, (screening: Screening) => screening.tickets)
  screenings: Screening[];

  @OneToMany(() => User, (user: User) => user.tickets)
  user: User;
}
