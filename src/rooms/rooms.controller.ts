import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListAllEntities } from './dto/list-rooms.dto';
import { Room } from './room.entity';
import { CreatePictureDto } from 'src/pictures/dto/create-picture.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@ApiTags('Rooms')
@ApiBearerAuth('JWT-auth')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({
    status: 201,
    description: 'The room has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden access.' })
  @ApiBody({
    type: CreateRoomDto,
    description: 'Json structure for room object',
  })
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<Room[]> {
    return this.roomsService.findAll(query.limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: number): Promise<Room> {
    return this.roomsService.remove(id);
  }

  @Post(':id/images')
  @Roles(Role.Admin)
  async uploadPicture(
    @Param('id') id: number,
    @Body() createPictureDto: CreatePictureDto,
  ) {
    return this.roomsService.addPicture(id, createPictureDto);
  }

  @Get(':id/images')
  async getPictures(@Param('id') id: number) {
    return this.roomsService.findAllPictures(id);
  }

  @Get(':id/images/:imageId')
  async getPicture(@Param('id') id: number, @Param('imageId') imageId: number) {
    return this.roomsService.findOnePicture(id, imageId);
  }

  @Patch(':id/images/:imageId')
  @Roles(Role.Admin)
  async updatePicture(
    @Param('id') id: number,
    @Param('imageId') imageId: number,
    @Body() updatePictureDto: CreatePictureDto,
  ) {
    return this.roomsService.updatePicture(id, imageId, updatePictureDto);
  }

  @Delete(':id/images/:imageId')
  @Roles(Role.Admin)
  async removePicture(
    @Param('id') id: number,
    @Param('imageId') imageId: number,
  ) {
    return this.roomsService.removePicture(id, imageId);
  }
}
