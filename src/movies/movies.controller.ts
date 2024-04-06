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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ListAllEntities } from './dto/list-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@ApiTags('Movies')
@Controller('movies')
@ApiBearerAuth('JWT-auth')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBody({
    type: CreateMovieDto,
    description: 'Json structure for movie object',
  })
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The movies has been successfully fetched.',
  })
  async findAll(@Query() query: ListAllEntities): Promise<Movie[]> {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully fetched.',
  })
  async findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async update(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found',
  })
  async remove(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.remove(id);
  }
}
