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
import { TicketTypesService } from './ticketTypes.service';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { ListAllEntities } from './dto/list-ticket-types.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { TicketType } from './ticketType.entity';

@ApiTags('Ticket Types')
@Controller('tickets-types')
@ApiBearerAuth('JWT-auth')
export class TicketTypesController {
  constructor(private readonly ticketTypesService: TicketTypesService) {}
  @Post()
  @Roles([Role.Admin])
  @ApiResponse({
    status: 201,
    description: 'The ticket type has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBody({
    type: CreateTicketTypeDto,
    description: 'Json structure for ticket type object',
  })
  async create(@Body() createTicketTYpeDto: CreateTicketTypeDto) {
    return this.ticketTypesService.create(createTicketTYpeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The tickets have been successfully fetched.',
  })
  async findAll(@Query() query: ListAllEntities): Promise<TicketType[]> {
    return this.ticketTypesService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully fetched.',
  })
  async findOne(@Param('id') id: number): Promise<TicketType> {
    return this.ticketTypesService.findOne(id);
  }

  @Patch(':id')
  @Roles([Role.Admin])
  @ApiResponse({
    status: 200,
    description: 'The ticket type has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async update(
    @Param('id') id: number,
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
  ): Promise<TicketType> {
    return this.ticketTypesService.update(id, updateTicketTypeDto);
  }

  @Delete(':id')
  @Roles([Role.Admin])
  @ApiResponse({
    status: 200,
    description: 'The ticket type has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket type not found',
  })
  async remove(@Param('id') id: number): Promise<TicketType> {
    return this.ticketTypesService.remove(id);
  }
}
