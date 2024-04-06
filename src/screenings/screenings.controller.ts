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
import { ScreeningsService } from './screenings.service';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { ListScreeningParams } from './dto/list-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { Screening } from './screening.entity';

@ApiTags('Screenings')
@Controller('screenings')
@ApiBearerAuth('JWT-auth')
export class ScreeningsController {
  constructor(private readonly moviesService: ScreeningsService) {}
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({
    status: 201,
    description: 'The screening has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBody({
    type: CreateScreeningDto,
    description: 'Json structure for screening object',
  })
  async create(@Body() createScreeningDTO: CreateScreeningDto) {
    return this.moviesService.create(createScreeningDTO);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The screenings has been successfully fetched.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async findAll(@Query() query: ListScreeningParams): Promise<Screening[]> {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully fetched.',
  })
  async findOne(@Param('id') id: number): Promise<Screening> {
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
    @Body() updateScreeningDto: UpdateScreeningDto,
  ): Promise<Screening> {
    return this.moviesService.update(id, updateScreeningDto);
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
  async remove(@Param('id') id: number): Promise<Screening> {
    return this.moviesService.remove(id);
  }
}
