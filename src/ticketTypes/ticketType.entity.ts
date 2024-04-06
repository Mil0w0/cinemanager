import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Entity()
export class TicketType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxEntries: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  price: number;

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.ticketType)
  tickets: Ticket[];
}
