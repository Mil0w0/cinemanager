import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { ScreeningValidator } from './screenings.validator';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/room.entity';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectRepository(Screening)
    private screeningsRepository: Repository<Screening>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async create(screening: CreateScreeningDto): Promise<Screening> {
    try {
      ScreeningValidator.validateCreateScreeningDto(screening);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const room: Room = await this.roomsRepository.findOneBy({
      id: screening.roomID,
    });
    const movie: Movie = await this.moviesRepository.findOneBy({
      id: screening.movieID,
    });

    const roomScreenings: Screening[] = await this.screeningsRepository.find({
      where: { room },
    });
    try {
      if (movie && room) {
        ScreeningValidator.validateTimeAndDuration(
          screening,
          movie,
          room,
          roomScreenings,
        );
      }
    } catch (error) {
      throw new BadRequestException(error.message);
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
    if (updates.duration) {
      const otherScreening = await this.screeningsRepository.findOneBy({
        duration: updates.duration,
      });
      if (otherScreening) {
        throw new BadRequestException(
          `Screening at ${updates.duration} already exists`,
        );
      }
    }
    await this.screeningsRepository.update(id, updates);
    return await this.screeningsRepository.findOneBy({ id });
  }

  async findAll(limit: number, page: number): Promise<Screening[]> {
    //TODO: Validate the page number : 500 when page is 0 atm and total COunt ?
    return await this.screeningsRepository.find({
      take: limit || 10,
      skip: (page - 1) * limit || 0,
      relations: ['movie', 'room'],
    });
  }

  async findOne(id: number): Promise<Screening> {
    const screening = await this.screeningsRepository.findOne({
      where: { id },
      relations: ['movie', 'room'],
    });
    if (!screening) {
      throw new NotFoundException(`Screening #${id} not found`);
    }
    return screening;
  }

  async remove(id: number): Promise<Screening> {
    const movie = await this.findOne(id);
    await this.screeningsRepository.delete(id);
    return movie;
  }
}
