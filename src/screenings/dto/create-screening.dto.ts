import { ApiProperty } from '@nestjs/swagger';

import { Movie } from '../../movies/movie.entity';
import { Room } from '../../rooms/room.entity';

export class CreateScreeningDto {
  @ApiProperty({
    example: '120',
    description:
      'Duration of the screening in minutes, must be more than 30min + the duration of the movie',
    required: true,
  })
  duration: number;

  @ApiProperty({
    example: '2024-06-12 12:00:02',
    description:
      'Duration of the screening in minutes, must be more than 30min + the duration of the movie',
    required: true,
  })
  startingTime: Date;

  @ApiProperty({
    example: '5',
    description: 'Movie id',
    required: true,
  })
  movieID: number;

  @ApiProperty({
    example: '2',
    description: 'Room id',
    required: true,
  })
  roomID: number;
}
