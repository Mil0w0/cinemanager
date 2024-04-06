import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ListAllEntities } from './dto/list-tickets.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './ticket.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@ApiTags('Tickets')
@Controller('tickets')
@ApiBearerAuth('JWT-auth')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The ticket has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBody({
    type: CreateTicketDto,
    description: 'Json structure for ticket object',
  })
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The tickets have been successfully fetched.',
  })
  async findAll(@Query() query: ListAllEntities): Promise<Ticket[]> {
    return this.ticketsService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully fetched.',
  })
  async findOne(@Param('id') id: number): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async update(
    @Param('id') id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket not found',
  })
  async remove(@Param('id') id: number): Promise<Ticket> {
    return this.ticketsService.remove(id);
  }
}
