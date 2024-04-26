import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { sign } from 'jsonwebtoken';
import { LogoutUserDto } from './dto/logout-user.dto';
import { UsersValidator } from './dto/users.validator';
import { Ticket } from '../tickets/ticket.entity';
import { TicketType } from '../ticketTypes/ticketType.entity';
import { CreateTicketDto } from '../tickets/dto/create-ticket.dto';
import { TicketsValidator } from '../tickets/tickets.validator';
import { ListTicketsDto } from '../tickets/dto/list-tickets.dto';
import { UpdateTicketDto } from '../tickets/dto/update-ticket.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(TicketType)
    private tickeTypesRepository: Repository<TicketType>,
  ) {
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      UsersValidator.validateCreateUserDto(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const otherUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (otherUser) {
      throw new BadRequestException(`Email ${user.email} already exists`);
    }

    user.password = await hash(user.password, 10);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An error occurred while creating the user',
      );
    }
  }

  async login(user_params: LoginUserDto) {
    try {
      UsersValidator.validateLoginUserDto(user_params);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    //User connection
    const user = await this.usersRepository.findOneBy({
      email: user_params.email,
    });
    let isValid: boolean = false;
    if (user) {
      isValid = await compare(user_params.password, user.password);
    }
    if (!isValid) {
      throw new BadRequestException(`Invalid email or password`);
    }

    try {
      //Token generation
      const secret = process.env.JWT_SECRET ?? '';
      const token = sign(
        { userId: user.id, email: user.email, roles: user.roles },
        secret,
        {
          expiresIn: '1w',
        },
      );
      await this.usersRepository.update(user.id, { loginToken: token });

      return {
        loginToken: token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'SOmething went wrong please try again',
      );
    }
  }

  async logout(params: LogoutUserDto) {
    if (!params.authToken) {
      throw new BadRequestException(`Missing required field authToken`);
    }
    const user = await this.usersRepository.findOneBy({
      loginToken: params.authToken,
    });
    if (!user) {
      throw new BadRequestException(`Invalid token`);
    }
    await this.usersRepository.update(user.id, { loginToken: '' });
    return {
      message: 'User successfully logged out',
    };
  }

  async update(id: number, params: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    if (params.email) {
      const otherUser = await this.usersRepository.findOneBy({
        email: params.email,
      });
      if (otherUser) {
        throw new BadRequestException(`User ${params.email} already exists`);
      }
    }
    await this.usersRepository.update(id, params);
    return await this.usersRepository.findOneBy({ id });
  }

  async findAll(limit?: number, page?: number): Promise<User[]> {
    return await this.usersRepository.find({
      take: limit || 10,
      skip: (page - 1) * limit || 0,
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(id);
    return user;
  }

  //TODO: only user connected can buy a ticket for themselves
  async buyTicket(ticket: CreateTicketDto): Promise<Ticket> {
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

  async findCustomerTickets(params: ListTicketsDto): Promise<Ticket[]> {
    return await this.ticketsRepository.find({
      take: params.limit || 10,
      skip: (params.page - 1) * params.limit || 0,
    });
  }

  async findCustomerTicket(ticketId: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOneBy({ id: ticketId });
    if (!ticket) {
      throw new NotFoundException(`Ticket #${ticketId} not found`);
    }
    return ticket;
  }

  async updateTicket(
    userID: number,
    ticketID: number,
    updates: UpdateTicketDto,
  ): Promise<Ticket> {
    await this.findOne(ticketID);
    try {
      await this.findOne(ticketID);
    } catch (e) {
      throw new NotFoundException('Ticket not found');
    }
    try {
      TicketsValidator.validateUpdateDto(updates);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    await this.ticketsRepository.update(ticketID, updates);
    return await this.ticketsRepository.findOneBy({ id: ticketID });
  }

  async removeTicket(userID: number, ticketID: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOneBy({ id: ticketID });
    if (!ticket) {
      throw new NotFoundException(`Ticket #${ticketID} not found`);
    }
    await this.ticketsRepository.delete({ id: ticketID });
    return ticket;
  }
}
