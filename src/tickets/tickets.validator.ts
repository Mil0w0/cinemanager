import { ListTicketsDto } from './dto/list-tickets.dto';
import { User } from '../users/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Repository } from 'typeorm';
import { TicketType } from '../ticketTypes/ticketType.entity';
import { UpdateTicketDto } from './dto/update-ticket.dto';

export class TicketsValidator {
  static async validateCreateDto(
    createTicketDto: CreateTicketDto,
    usersRepository: Repository<User>,
    ticketTypesRepository: Repository<TicketType>,
  ) {
    if (!createTicketDto.userID) {
      throw new Error('User ID is required');
    }
    if (!createTicketDto.price) {
      throw new Error('Price is required');
    }
    if (!createTicketDto.entriesLeft) {
      throw new Error('Entries left is required');
    }
    if (!createTicketDto.ticketTypeID) {
      throw new Error('Ticket type ID is required');
    }
    if (!usersRepository.findOneBy({ id: createTicketDto.userID })) {
      throw new Error('User not found');
    }
    if (
      !ticketTypesRepository.findOneBy({ id: createTicketDto.ticketTypeID })
    ) {
      throw new Error('Ticket type not found');
    }
    //get the user then check if the user as the necessary balance
    const user = await usersRepository.findOneBy({
      id: createTicketDto.userID,
    });
    if (user.balance < createTicketDto.price) {
      throw new Error('User does not have enough balance');
    }
  }

  static validateUpdateDto(updateTicketDto: UpdateTicketDto) {
    if (updateTicketDto.entriesLeft < 0) {
      throw new Error('Entries left must be greater than or equal to 0');
    }
  }

  static validateListEntities(listAllEntities: ListTicketsDto) {
    if (listAllEntities.page <= 0) {
      throw new Error('Page must be greater than 0');
    }
  }
}
