import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListTicketsDto } from './dto/list-tickets.dto';
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

  async findAll(listDto: ListTicketsDto): Promise<Ticket[]> {
    return await this.ticketsRepository.find({
      take: listDto.limit || 10,
      skip: (listDto.page - 1) * listDto.limit || 0,
      relations: ['user', 'screenings'],
    });
  }
}
