import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    /*try {
      UserValidator.validateCreateUserDto(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }*/
    const otherUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (otherUser) {
      throw new BadRequestException(`Email ${user.email} already exists`);
    }
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while creating the user',
      );
    }
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

  async findAll(limit: number, page: number): Promise<User[]> {
    //TODO: Validate the page number : 500 when page is 0 atm
    return await this.usersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
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
}
