import { Controller, Get, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ListTicketsDto } from './dto/list-tickets.dto';
import { Ticket } from './ticket.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@ApiTags('Tickets')
@Controller('tickets')
@ApiBearerAuth('JWT-auth')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Get()
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'The tickets have been successfully fetched.',
  })
  async findAll(@Query() query: ListTicketsDto): Promise<Ticket[]> {
    return this.ticketsService.findAll(query);
  }
}
