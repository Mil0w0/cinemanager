import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  findAll(limit: number): Promise<Movie[]> {
    return this.moviesRepository.find({ take: limit });
  }

  findOne(id: number): Promise<Movie | null> {
    return this.moviesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }
}