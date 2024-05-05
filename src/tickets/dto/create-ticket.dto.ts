import { ApiProperty } from '@nestjs/swagger';
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
    example: '2021-05-01',
    required: false,
  })
  buyDate: Date;

  @ApiProperty({
    example: '7.99',
    required: true,
  })
  price: number;

  @ApiProperty({
    example: '1',
    required: true,
  })
  ticketTypeID: number;
}
