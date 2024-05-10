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
import { ListScreeningParams } from './dto/list-screening.dto';

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
      id: screening.roomId,
    });
    const movie: Movie = await this.moviesRepository.findOneBy({
      id: screening.movieId,
    });

    const roomScreenings: Screening[] = await this.screeningsRepository.find({
      where: { room },
    });
    try {
      ScreeningValidator.validateTimeAndDuration(
        screening,
        movie,
        room,
        roomScreenings,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    try {
      screening.movie = movie;
      screening.room = room;
      try {
        screening.startingTime = new Date(screening.startingTime);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      return await this.screeningsRepository.save(screening);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while creating the screening',
      );
    }
  }

  async update(id: number, updates: UpdateScreeningDto): Promise<Screening> {
    const screening = await this.findOne(id);
    if (screening) {
      const movie: Movie = await this.moviesRepository.findOneBy({
        id: updates.movieID,
      });
      const room: Room = await this.roomsRepository.findOneBy({
        id: updates.roomID,
      });
      const roomScreenings: Screening[] = await this.screeningsRepository.find({
        where: { room },
      });

      try {
        if (movie && room) {
          ScreeningValidator.validateUpdateTimeAndDuration(
            movie,
            room,
            updates,
            roomScreenings,
          );
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      // TODO : fix this ?
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { movieID, roomID, ...rest } = updates;

      await this.screeningsRepository.save({ ...screening, ...rest });
      return await this.screeningsRepository.findOneBy({ id });
    }
    throw new NotFoundException(`Screening #${id} not found`);
  }

  async findAll(params: ListScreeningParams): Promise<Screening[]> {
    const queryBuilder =
      this.screeningsRepository.createQueryBuilder('screening');

    queryBuilder.where('room.isAvailable = :isAvailable', {
      isAvailable: true,
    });

    if (params.to && params.from) {
      queryBuilder.where('screening.startingTime BETWEEN :from AND :to', {
        from: params.from,
        to: params.to,
      });
    } else if (params.to) {
      queryBuilder.where('screening.startingTime <= :to', {
        to: params.to,
      });
    } else if (params.from) {
      queryBuilder.where('screening.startingTime >= :from', {
        from: params.from,
      });
    }

    if (params.movieID) {
      queryBuilder.andWhere('screening.movie.id = :movieID', {
        movieID: params.movieID,
      });
    }
    if (params.roomID) {
      queryBuilder.andWhere('screening.room.id = :roomID', {
        roomID: params.roomID,
      });
    }
    queryBuilder
      .innerJoinAndSelect('screening.movie', 'movie')
      .innerJoinAndSelect('screening.room', 'room')
      .take(params.limit || 10)
      .skip((params.page - 1) * params.limit || 0);

    return await queryBuilder.getMany();
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
