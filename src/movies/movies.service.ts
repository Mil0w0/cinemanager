import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieValidator } from './movies.validator';
import { ListAllEntities } from './dto/list-movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(movie: CreateMovieDto): Promise<Movie> {
    try {
      MovieValidator.validateCreateMovieDto(movie);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const otherMovie = await this.moviesRepository.findOneBy({
      title: movie.title,
    });
    if (otherMovie) {
      throw new BadRequestException(`Movie ${movie.title} already exists`);
    }
    try {
      return await this.moviesRepository.save(movie);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while creating the movie',
      );
    }
  }

  async update(id: number, updates: UpdateMovieDto): Promise<Movie> {
    await this.findOne(id);
    if (updates.title) {
      const otherMovie = await this.moviesRepository.findOneBy({
        title: updates.title,
      });
      if (otherMovie) {
        throw new BadRequestException(`Movie ${updates.title} already exists`);
      }
    }
    await this.moviesRepository.update(id, updates);
    return await this.moviesRepository.findOneBy({ id });
  }

  async findAll(listDto: ListAllEntities): Promise<Movie[]> {
    return await this.moviesRepository.find({
      take: listDto.limit || 10,
      skip: (listDto.page - 1) * listDto.limit || 0,
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return movie;
  }

  async remove(id: number): Promise<Movie> {
    const movie = await this.findOne(id);
    await this.moviesRepository.delete(id);
    return movie;
  }
}
