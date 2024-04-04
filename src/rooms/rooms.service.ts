import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomValidator } from './rooms.validator';
import { Picture } from 'src/pictures/picture.entity';
import { CreatePictureDto } from 'src/pictures/dto/create-picture.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
  ) {}

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
    await this.roomsRepository.update(id, updates);
    return await this.roomsRepository.findOneBy({ id });
  }

  async findAll(limit: number): Promise<Room[]> {
    return await this.roomsRepository.find({ take: limit });
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
}
