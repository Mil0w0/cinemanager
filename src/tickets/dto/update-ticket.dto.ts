import { IsDate, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDto {
  @ApiProperty({
    example: '1',
    required: false,
  })
  entriesLeft?: number;

  @ApiProperty({
    example: '1',
    required: false,
  })
  screeningIDS?: number[];
}
