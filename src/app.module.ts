import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie } from './movies/movie.entity';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { Room } from './rooms/room.entity';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { Picture } from './pictures/picture.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { Screening } from './screenings/screening.entity';
import { ScreeningsController } from './screenings/screenings.controller';
import { ScreeningsService } from './screenings/screenings.service';
import { Ticket } from './tickets/ticket.entity';
import { TicketType } from './ticketTypes/ticketType.entity';
import { TicketsController } from './tickets/tickets.controller';
import { TicketTypesController } from './ticketTypes/ticketTypes.controller';
import { TicketsService } from './tickets/tickets.service';
import { TicketTypesService } from './ticketTypes/ticketTypes.service';
import { Transaction } from './transaction/trasaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-db',
      port: parseInt(process.env.HOST_DB_PORT),
      username: process.env.DATABASE_ROOT,
      password: process.env.DATABASE_ROOT_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Movie,
        Room,
        Picture,
        User,
        Screening,
        Ticket,
        TicketType,
        Transaction,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Movie,
      Room,
      Picture,
      User,
      Screening,
      Ticket,
      TicketType,
      Transaction,
    ]),
  ],
  controllers: [
    AppController,
    MoviesController,
    RoomsController,
    UsersController,
    ScreeningsController,
    TicketsController,
    TicketTypesController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
    MoviesService,
    RoomsService,
    UsersService,
    ScreeningsService,
    TicketsService,
    TicketTypesService,
  ],
})
export class AppModule {
}
