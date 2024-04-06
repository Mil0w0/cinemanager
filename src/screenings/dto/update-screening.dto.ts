import { IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScreeningDto {
  @ApiProperty({
    example: '2024-06-12 12:00:02',
    required: false,
  })
  @IsString()
  startingTime?: Date;

  @ApiProperty({
    example: '120',
    required: false,
  })
  @IsPositive()
  duration?: number;

  @ApiProperty({
    example: '1',
    required: false,
  })
  movieID: number;

  @ApiProperty({
    example: '1',
    required: false,
  })
  roomID: number;
}
