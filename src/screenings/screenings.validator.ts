import { ListAllEntities } from './dto/list-screening.dto';
import { BadRequestException } from '@nestjs/common';
import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/room.entity';

const MINIMUM_SCREENING_EXTRA_DURATION = 30;
const CINEMA_OPENING_HOUR = 8;
const CINEMA_CLOSING_HOUR = 22;
export class ScreeningValidator {
  static validateCreateScreeningDto(createSCreeningDto) {
    if (!createSCreeningDto.movie) {
      throw new Error('Movie ID is required');
    }
    if (!createSCreeningDto.room) {
      throw new Error('Room ID is required');
    }
    if (!createSCreeningDto.duration) {
      throw new Error('Duration is required');
    }
    if (!createSCreeningDto.startingTime) {
      throw new Error('Starting time of the screening is required');
    }
  }

  static validateTimeAndDuration(
    screening: CreateScreeningDto,
    movie: Movie,
    room: Room,
    roomScreenings: Screening[],
  ) {
    if (
      movie.duration + MINIMUM_SCREENING_EXTRA_DURATION >
      screening.duration
    ) {
      throw new BadRequestException(
        `Screening duration must be more than ${movie.duration + MINIMUM_SCREENING_EXTRA_DURATION} minutes(movie duration + extra time)`,
      );
    }
    this.validateStartingTime(screening, room, roomScreenings);
  }

  private static validateStartingTime(
    createSCreeningDto: CreateScreeningDto,
    room: Room,
    roomScreenings: Screening[],
  ): void {
    const screeningStartingTime: Date = new Date(
      createSCreeningDto.startingTime,
    );

    //STARTING TIME AND DURATION VALIDATION

    screeningStartingTime.setMinutes(
      screeningStartingTime.getMinutes() + createSCreeningDto.duration,
    );
    const screeningEndingDate: Date = new Date(createSCreeningDto.startingTime);

    if (
      screeningStartingTime.getHours() < CINEMA_OPENING_HOUR ||
      screeningEndingDate.getHours() > CINEMA_CLOSING_HOUR
    ) {
      throw new Error(
        `Screening cannot start before the cinema opens at ${CINEMA_OPENING_HOUR}:00 or end after the cinema closes at ${CINEMA_CLOSING_HOUR}:00`,
      );
    }
    if (roomScreenings) {
      roomScreenings.forEach((s: Screening) => {
        const otherScreeningStartingDate: Date = new Date(s.startingTime);
        s.startingTime.setMinutes(s.startingTime.getMinutes() + s.duration);
        const otherScreeningEndingDate: Date = new Date(s.startingTime);

        if (
          //screening starts during another screening in this room
          (screeningStartingTime > otherScreeningStartingDate &&
            screeningStartingTime <= otherScreeningEndingDate) ||
          //screening ends during another screening in this room
          (screeningEndingDate > otherScreeningStartingDate &&
            screeningEndingDate <= otherScreeningEndingDate)
        ) {
          throw new BadRequestException(
            `The screening will overlap another one in room ${createSCreeningDto.roomID}`,
          );
        }
      });
    }
  }

  static validateListEntities(listAllEntities: ListAllEntities) {
    if (listAllEntities.page <= 0) {
      throw new Error('Page must be greater than 0');
    }
  }
}
