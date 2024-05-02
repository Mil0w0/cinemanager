import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/room.entity';
import { Ticket } from '../tickets/ticket.entity';

@Entity()
export class Screening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;

  @Column()
  startingTime: Date;

  @ManyToOne(() => Movie, (movie: Movie) => movie.screenings)
  movie: Movie;

  @ManyToOne(() => Room, (room: Room) => room.screenings)
  room: Room;

  @ManyToMany(() => Ticket, (ticket: Ticket) => ticket.screenings)
  @JoinTable()
  tickets: Ticket[];
}
