import {ListAllEntities} from "./dto/list-movies.dto";

export class MovieValidator {
    static validateCreateMovieDto(createMovieDto) {
        if (!createMovieDto.title) {
            throw new Error('Title is required');
        }
        if (!createMovieDto.releaseDate) {
            throw new Error('Release date is required');
        }
        if (!createMovieDto.category) {
            throw new Error('Category is required');
        }
        if (!createMovieDto.duration) {
            throw new Error('Duration is required');
        }
        if (createMovieDto.duration <= 0) {
            throw new Error('Duration must be greater than 0');
        }
    }

    static validateListEntities(listAllEntities: ListAllEntities){
        if (listAllEntities.page <= 0) {
            throw new Error('Page must be greater than 0');
        }
    }
}