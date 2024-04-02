import { ListAllEntities } from './dto/list-screening.dto';
import { BadRequestException } from '@nestjs/common';
import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';

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
    if (createSCreeningDto.duration <= 0) {
      throw new Error('Duration must be greater than 0');
    }
    if (
      createSCreeningDto.movie.duration + MINIMUM_SCREENING_EXTRA_DURATION <
      createSCreeningDto.duration
    ) {
      throw new BadRequestException(
        `Screening duration must be more than ${createSCreeningDto.movie.duration + MINIMUM_SCREENING_EXTRA_DURATION} minutes(movie duration + extra time)`,
      );
    }
    if (!createSCreeningDto.startingTime) {
      throw new Error('Starting time of the screening is required');
    }
    this.validateStartingTime(createSCreeningDto);
  }
  private static validateStartingTime(
    createSCreeningDto: CreateScreeningDto,
  ): void {
    const screeningStartingTime = new Date(createSCreeningDto.startingTime);
    console.log(screeningStartingTime);

    //STARTING TIME AND DURATION VALIDATION
    const screeningEndingDate: Date = new Date(
      screeningStartingTime.setMinutes(
        screeningStartingTime.getMinutes() +
          createSCreeningDto.duration),
    );
    console.log(screeningEndingDate);

    if (
      screeningStartingTime.getHours() < CINEMA_OPENING_HOUR ||
      screeningEndingDate.getHours() > CINEMA_CLOSING_HOUR
    ) {
      throw new Error(
        `Screening cannot start before the cinema opens at ${CINEMA_OPENING_HOUR}:00 or end after the cinema closes at ${CINEMA_CLOSING_HOUR}:00`,
      );
    }
    if (createSCreeningDto.room.screenings) {
      createSCreeningDto.room.screenings.forEach((s: Screening) => {
        //TYPE ISSUE????
        const otherScreeningEndingDate: Date = new Date(
          s.startingTime.setMinutes(s.startingTime.getMinutes() + s.duration),
        );
        if (
          //screening starts during another screening in this room
          (screeningStartingTime > s.startingTime &&
            screeningStartingTime < otherScreeningEndingDate) ||
          //screening ends during another screening in this room
          (screeningEndingDate > s.startingTime &&
            screeningEndingDate < otherScreeningEndingDate)
        ) {
          throw new BadRequestException(
            `The screening will overlap another one in room ${createSCreeningDto.room.id}`,
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
