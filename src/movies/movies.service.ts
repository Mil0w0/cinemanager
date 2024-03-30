import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(movie: CreateMovieDto): Promise<Movie> {
    const otherMovie = this.moviesRepository.findOneBy({ title: movie.title });
    if (otherMovie) {
      throw new BadRequestException(`Movie ${movie.title} already exists`);
    }
    try {
      return await this.moviesRepository.save(movie);
    } catch (error) {
        throw new BadRequestException(error.message || 'An error occurred while creating the movie');
    }
  }

  async update(id: number, updates: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    await this.moviesRepository.update(id, updates);
    return await this.moviesRepository.findOneBy({ id });
  }

  async findAll(limit: number): Promise<Movie[]> {
    return await this.moviesRepository.find({ take: limit });
  }

  async findOne(id: number): Promise<Movie> {
    if (!id) {
      throw new BadRequestException('Movie id is required');
    }
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return movie;
  }

  async remove(id: number): Promise<Movie> {
    if (!id) {
        throw new BadRequestException('Movie id is required');
      }
      const movie = await this.moviesRepository.findOneBy({ id });
      if (!movie) {
        throw new NotFoundException(`Movie #${id} not found`);
    }
    await this.moviesRepository.delete(id);
    return movie;
  }
}
