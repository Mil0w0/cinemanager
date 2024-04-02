import { ApiProperty } from '@nestjs/swagger';

import { IsDate, IsPositive, IsString } from 'class-validator';
import {Column, ManyToOne} from "typeorm";
import {Movie} from "../../movies/movie.entity";
import {Room} from "../../rooms/room.entity";

export class CreateScreeningDto {
  @ApiProperty({
    example: '120',
    description: 'Duration of the screening in minutes, must be more than 30min + the duration of the movie',
    required: true,
  })
  duration: number;

  @ApiProperty({
    example: '2024-06-12 12:00:02',
    description: 'Duration of the screening in minutes, must be more than 30min + the duration of the movie',
    required: true,
  })
  startingTime: Date;

  @ApiProperty({
    example: '5',
    description: 'Movie id',
    required: true,
  })
  @ManyToOne(() => Movie, (movie: Movie) => movie.screenings)
  movie: Movie;

  @ApiProperty({
    example: '2',
    description: 'Room id',
    required: true,
  })
  @ManyToOne(() => Room, (room: Room) => room.screenings)
  room: Room;
}
