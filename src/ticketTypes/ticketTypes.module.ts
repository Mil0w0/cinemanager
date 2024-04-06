import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketType } from './ticketType.entity';
import { TicketTypesService } from './ticketTypes.service';
import { TicketTypesController } from './ticketTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TicketType])],
  providers: [TicketTypesService],
  controllers: [TicketTypesController],
})
export class MoviesModule {}
