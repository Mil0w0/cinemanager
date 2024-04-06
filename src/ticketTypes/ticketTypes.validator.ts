import { ListAllEntities } from './dto/list-ticket-types.dto';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { Repository } from 'typeorm';
import { TicketType } from './ticketType.entity';

export class TicketTypesValidator {
  static validateCreateTicketTypeDto(
    ticketType: CreateTicketTypeDto,
    ticketTypesRepository: Repository<TicketType>,
  ) {
    if (!ticketType.name) {
      throw new Error('Name is required');
    }
    ticketTypesRepository
      .findOneBy({ name: ticketType.name })
      .then((ticketType) => {
        if (ticketType) {
          throw new Error('Name already used');
        }
      });
    if (!ticketType.maxEntries) {
      throw new Error('Max entries attribute is required');
    }
    if (ticketType.price < 0) {
      throw new Error('Price must be greater or equal to 0');
    }
    if (ticketType.maxEntries <= 0) {
      throw new Error('Max entries must be greater than 0');
    }
  }

  static validateListEntities(listAllEntities: ListAllEntities) {
    if (listAllEntities.page <= 0) {
      throw new Error('Page must be greater than 0');
    }
  }
}
