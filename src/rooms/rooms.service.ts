import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan, MoreThan, QueryResult } from 'typeorm';
import { Room } from './room.entity';
import { Attendance } from 'src/attendance/attendance';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomValidator } from './rooms.validator';
import { Movie } from 'src/movies/movie.entity';
import { Picture } from 'src/pictures/picture.entity';
import { CreatePictureDto } from 'src/pictures/dto/create-picture.dto';
import { Screening } from 'src/screenings/screening.entity';
import { Ticket } from 'src/tickets/ticket.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
    @InjectRepository(Screening)
    private screeningRepository: Repository<Screening>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) { }

  async create(room: CreateRoomDto): Promise<Room> {
    try {
      RoomValidator.validateCreateRoomDto(room);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const otherRoom = await this.roomsRepository.findOneBy({
      name: room.name,
    });
    if (otherRoom) {
      throw new BadRequestException(`Room ${room.name} already exists`);
    }
    try {
      return await this.roomsRepository.save(room);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while creating the room',
      );
    }
  }

  async update(id: number, updates: UpdateRoomDto): Promise<Room> {
    await this.findOne(id);
    if (updates.name) {
      const otherRoom = await this.roomsRepository.findOneBy({
        name: updates.name,
      });
      if (otherRoom) {
        throw new BadRequestException(`Room ${updates.name} already exists`);
      }
    }
    try {
      RoomValidator.validateUpdateRoomDto(updates);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    await this.roomsRepository.update(id, updates);
    return await this.roomsRepository.findOneBy({ id });
  }

  async findAll(limit?: number, page?: number): Promise<Room[]> {
    return await this.roomsRepository.find({
      take: limit || 10,
      skip: (page - 1) * limit || 0,
    });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({
      where: { id },
      relations: ['pictures', 'screenings'],
    });
    if (!room) {
      throw new NotFoundException(`Room #${id} not found`);
    }
    return room;
  }

  async remove(id: number): Promise<Room> {
    const room = await this.findOne(id);
    await this.roomsRepository.delete(id);
    return room;
  }

  async addPicture(
    id: number,
    CreatePictureDto: CreatePictureDto,
  ): Promise<Picture> {
    const room = await this.findOne(id);
    const otherPicture = await this.picturesRepository.findOneBy({
      name: CreatePictureDto.url,
    });
    if (otherPicture) {
      throw new BadRequestException(
        `Picture with url ${CreatePictureDto.url} already exists`,
      );
    }
    CreatePictureDto.room = room;
    return this.picturesRepository.save(CreatePictureDto);
  }

  async findOnePicture(idRoom: number, idPicture: number): Promise<Picture> {
    await this.findOne(idRoom);
    const picture = await this.picturesRepository.findOneBy({ id: idPicture });
    if (!picture) {
      throw new NotFoundException(`Picture #${idPicture} not found`);
    }
    return picture;
  }

  async findAllPictures(idRoom: number): Promise<Picture[]> {
    const room = await this.findOne(idRoom);
    return this.picturesRepository.find({ where: { room: room } });
  }

  async updatePicture(
    idRoom: number,
    idPicture: number,
    updatePictureDto: CreatePictureDto,
  ): Promise<Picture> {
    await this.findOne(idRoom);
    await this.findOnePicture(idRoom, idPicture);
    await this.picturesRepository.update(idPicture, updatePictureDto);
    return await this.picturesRepository.findOneBy({ id: idPicture });
  }

  async removePicture(idRoom: number, idPicture: number): Promise<Picture> {
    await this.findOne(idRoom);
    const picture = await this.findOnePicture(idRoom, idPicture);
    await this.picturesRepository.delete(idPicture);
    return picture;
  }

  async getAttendances(startDate: Date, endDate: Date): Promise<Attendance[]> {
    const rooms = await this.roomsRepository.find();

    const attendances: Attendance[] = [];

    if (startDate !== undefined && endDate !== undefined) {
      for (const room of rooms) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const attendance = new Attendance();
        attendance.room = room;
        attendance.nbUsers = await this.calculateAttendanceForRoomAndDate(attendance, room, startDate, endDate, true);
        attendances.push(attendance);
      }
      const room = new Room();
      room.name = "Cinema / All Rooms";
      const cinema = new Attendance();
      cinema.room = room;
      cinema.nbUsers = 0;
      let count = 0;
      for (const attendance of attendances) {
        cinema.nbUsers += attendance.nbUsers;
        if (attendance.nbUsers > count) {
          count = attendance.nbUsers;
          cinema.bestMovie = attendance.bestMovie;
        }
      }
      attendances.push(cinema);

      return attendances;
    }

    for (const room of rooms) {
      startDate = new Date();
      endDate = new Date();
      let attendance = new Attendance();
      attendance.room = room;
      attendance.currentUsers = await this.calculateAttendanceNow(room);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      attendance.todayUsers = await this.calculateAttendanceForRoomAndDate(attendance, room, startDate, endDate, false);
      startDate.setDate(startDate.getDate() - 6);
      attendance.weeklyUsers = await this.calculateAttendanceForRoomAndDate(attendance, room, startDate, endDate, false);
      attendances.push(attendance);
    }
    const room = new Room();
    room.name = "Cinema / All Rooms";
    const cinema = new Attendance();
    cinema.room = room;
    cinema.currentUsers = 0;
    cinema.todayUsers = 0;
    cinema.weeklyUsers = 0;
    for (const attendance of attendances) {
      cinema.currentUsers += attendance.currentUsers;
      cinema.todayUsers += attendance.todayUsers;
      cinema.weeklyUsers += attendance.weeklyUsers;
    }
    attendances.push(cinema);

    return attendances;
  }

  private async calculateAttendanceNow(room: Room): Promise<number> {
    const now = new Date();
    const screenings = await this.screeningRepository.find({
      where: {
        room,
        startingTime: LessThan(now),
      },
    });

    const activeScreenings = screenings.filter(screening => {
      const endingTime = new Date(screening.startingTime.getTime() + screening.duration * 60000);
      return endingTime > now;
    });

    if (activeScreenings.length === 0) {
      return 0;
    }

    const ticketScreeningIds = activeScreenings.map(activeScreenings => activeScreenings.id);
    const tickets = await this.ticketRepository.createQueryBuilder('ticket')
      .innerJoinAndSelect('ticket.screenings', 'screening')
      .where('screening.id IN (:...ids)', { ids: ticketScreeningIds })
      .getMany();

    return tickets.length;
  }


  private async calculateAttendanceForRoomAndDate(attendance: Attendance, room: Room, startDate: Date, endDate: Date, isGlobalAttendance: boolean): Promise<number> {
    const screenings = await this.screeningRepository.find({
      where: {
        room,
        startingTime: Between(startDate, endDate),
      },
      relations: ['movie'],
    });

    if (screenings.length === 0) {
      return 0;
    }

    let count = 0;

    let bestScreening: Screening;

    let bestScreeningCount = 0;

    for (const screening of screenings) {
      const tickets = await this.ticketRepository.find({
        where: {
          screenings: [screening],
        },
      });
      count += tickets.length;
      if (tickets.length > bestScreeningCount) {
        bestScreening = screening;
        bestScreeningCount = tickets.length;
      }
    }

    if (isGlobalAttendance && bestScreeningCount > 0) {
      attendance.bestMovie = bestScreening.movie;
    }

    return count;
  }
}
