import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-movie.dto';
import { MovieValidator } from './screenings.validator';
import { ListAllEntities } from './dto/list-movies.dto';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectRepository(Screening)
    private moviesRepository: Repository<Screening>,
  ) {}

  async create(movie: CreateScreeningDto): Promise<Screening> {
    try {
      ScreeningValidator.validateCreateScreeningDto(screening);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const otherScreening = await this.screeningsRepository.findOneBy({
      //title: screening.title,
    });
    if (otherScreening) {
      throw new BadRequestException(`Screening ${screening.id} already exists`);
    }
    try {
      return await this.screeningsRepository.save(screening);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while creating the screening',
      );
    }
  }

  async update(id: number, updates: UpdateScreeningDto): Promise<Screening> {
    await this.findOne(id);
    if (updates.title) {
      const otherScreening = await this.screeningsRepository.findOneBy({
        title: updates.title,
      });
      if (otherScreening) {
        throw new BadRequestException(`Screening ${updates.title} already exists`);
      }
    }
    await this.moviesRepository.update(id, updates);
    return await this.moviesRepository.findOneBy({ id });
  }

  async findAll(limit: number, page: number): Promise<Screening[]> {
    //TODO: Validate the page number : 500 when page is 0 atm and total COunt ?
    return await this.moviesRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number): Promise<Screening> {
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Screening #${id} not found`);
    }
    return movie;
  }

  async remove(id: number): Promise<Screening> {
    const movie = await this.findOne(id);
    await this.moviesRepository.delete(id);
    return movie;
  }
}
