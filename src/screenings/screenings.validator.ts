import { ListAllEntities } from './dto/list-screening.dto';

export class ScreeningValidator {
  static validateCreateScreeningDto(createMovieDto) {
    if (!createMovieDto.movie) {
      throw new Error('Movie is required');
    }
    if (!createMovieDto.room) {
      throw new Error('Room date is required');
    }
    if (!createMovieDto.startingTime) {
      throw new Error('Starting time is required');
    }
    if (!createMovieDto.duration) {
      throw new Error('Duration is required');
    }
    if (createMovieDto.duration <= 0) {
      throw new Error('Duration must be greater than 0');
    }
  }

  static validateListEntities(listAllEntities: ListAllEntities) {
    if (listAllEntities.page <= 0) {
      throw new Error('Page must be greater than 0');
    }
  }
}
