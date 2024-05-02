import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDto {
  @ApiProperty({
    example: '1',
    required: false,
  })
  entriesLeft?: number;
}
export class UpdateTicketScreeningDTO {
  @ApiProperty({
    example: '1',
    required: false,
  })
  ticketID: number;
}
