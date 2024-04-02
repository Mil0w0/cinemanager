import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/room.entity';

@Entity()
export class Screening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;

  @Column()
  startingTime: Date;

  @Column(
    {
      default: 0
    }
  )
  entries: number;

  @ManyToOne(() => Movie, (movie: Movie) => movie.screenings)
  movie: Movie;

  @ManyToOne(() => Room, (room: Room) => room.screenings)
  room: Room;
}
