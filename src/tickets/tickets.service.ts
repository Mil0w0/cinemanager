import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsValidator } from './tickets.validator';
import { ListAllEntities } from './dto/list-tickets.dto';
import { Ticket } from './ticket.entity';
import { User } from '../users/user.entity';
import { TicketType } from '../ticketTypes/ticketType.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(TicketType)
    private tickeTypesRepository: Repository<TicketType>,
  ) {}

  async create(ticket: CreateTicketDto): Promise<Ticket> {
    try {
      TicketsValidator.validateCreateDto(
        ticket,
        this.usersRepository,
        this.tickeTypesRepository,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    const ticketType = await this.tickeTypesRepository.findOneBy({
      id: ticket.ticketTypeID,
    });
    ticket.entriesLeft = ticketType.maxEntries;
    return await this.ticketsRepository.save(ticket);
  }

  async update(id: number, updates: UpdateTicketDto): Promise<Ticket> {
    await this.findOne(id);
    try {
      await this.findOne(id);
    } catch (e) {
      throw new NotFoundException('Ticket not found');
    }
    try {
      TicketsValidator.validateUpdateDto(updates);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    await this.ticketsRepository.update(id, updates);
    return await this.ticketsRepository.findOneBy({ id });
  }

  async findAll(listDto: ListAllEntities): Promise<Ticket[]> {
    return await this.ticketsRepository.find({
      take: listDto.limit || 10,
      skip: (listDto.page - 1) * listDto.limit || 0,
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return ticket;
  }

  async remove(id: number): Promise<Ticket> {
    const ticket = await this.findOne(id);
    await this.ticketsRepository.delete(id);
    return ticket;
  }
}
