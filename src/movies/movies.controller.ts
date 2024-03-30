import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
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
