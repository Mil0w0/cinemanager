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
    if (!createTicketDto.price) {
      throw new Error('Price is required');
    }
    if (!createTicketDto.entriesLeft) {
      throw new Error('Entries left is required');
    }
    if (!createTicketDto.ticketTypeID) {
      throw new Error('Ticket type ID is required');
    }
    if (
      !ticketTypesRepository.findOneBy({ id: createTicketDto.ticketTypeID })
    ) {
      throw new Error('Ticket type not found');
    }
  }
  static valideUSerBalance(user: User, price: number) {
    //check if the user as the necessary balance
    let balance = 0;
    if (user.transactions && user.transactions.length > 0) {
      balance = user.transactions.reduce((sum, transaction) => {
        // Convert the amount from string to number
        const amount = parseFloat(String(transaction.amount));
        return sum + amount;
      }, 0);
    }
    if (balance < price) {
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
