import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';
import { Room } from 'src/rooms/room.entity';

export class CreatePictureDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  room: Room;
}
