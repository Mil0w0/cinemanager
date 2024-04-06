import { ApiProperty } from '@nestjs/swagger';

import { IsDate, IsPositive, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    example: '1',
    required: false,
  })
  entriesLeft: number;

  @ApiProperty({
    example: '1',
    required: true,
  })
  userID: number;

  @ApiProperty({
    example: '1',
    required: true,
  })
  ticketTypeID: number;
}
