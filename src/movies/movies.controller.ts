import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ListAllEntities } from './dto/list-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {

    return 'This action adds a new cat';
  }

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<Movie[]> {
    return this.moviesService.findAll(query.limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}