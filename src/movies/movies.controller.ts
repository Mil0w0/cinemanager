import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ListAllEntities } from './dto/list-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
  })
  //@ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
    type: CreateMovieDto,
    description: 'Json structure for movie object',
  })
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<Movie[]> {
    return this.moviesService.findAll(query.limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<Movie>{
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie>{
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(204 )
  async remove(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
}
