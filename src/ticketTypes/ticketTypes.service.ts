import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { ListAllEntities } from './dto/list-ticket-types.dto';
import { TicketType } from './ticketType.entity';
import { TicketTypesValidator } from './ticketTypes.validator';

@Injectable()
export class TicketTypesService {
  constructor(
    @InjectRepository(TicketType)
    private ticketTypesRepository: Repository<TicketType>,
  ) {}

  async create(ticketType: CreateTicketTypeDto): Promise<TicketType> {
    try {
      TicketTypesValidator.validateCreateTicketTypeDto(
        ticketType,
        this.ticketTypesRepository,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return await this.ticketTypesRepository.save(ticketType);
  }

  async update(id: number, updates: UpdateTicketTypeDto): Promise<TicketType> {
    await this.findOne(id);
    try {
      if (updates.name) {
        const otherTicketType = await this.ticketTypesRepository.findOneBy({
          name: updates.name,
        });
        if (otherTicketType) {
          throw new BadRequestException(
            `TicketType ${updates.name} already exists`,
          );
        }
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    await this.ticketTypesRepository.update(id, updates);
    return await this.ticketTypesRepository.findOneBy({ id });
  }

  async findAll(listDto: ListAllEntities): Promise<TicketType[]> {
    return await this.ticketTypesRepository.find({
      take: listDto.limit || 10,
      skip: (listDto.page - 1) * listDto.limit || 0,
    });
  }

  async findOne(id: number): Promise<TicketType> {
    const ticket = await this.ticketTypesRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`TicketType #${id} not found`);
    }
    return ticket;
  }

  async remove(id: number): Promise<TicketType> {
    const ticket = await this.findOne(id);
    await this.ticketTypesRepository.delete(id);
    return ticket;
  }
}
