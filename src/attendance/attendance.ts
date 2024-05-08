import { Movie } from 'src/movies/movie.entity';
import { Room } from 'src/rooms/room.entity';

export class Attendance {

  room: Room;

  currentUsers: number;

  todayUsers: number;

  weeklyUsers: number;

  nbUsers: number;

  bestMovie: Movie | null;

}
