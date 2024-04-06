import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketTypeDto {
  @ApiProperty({
    example: '1',
    required: true,
  })
  maxEntries: number;

  @ApiProperty({
    example: '11.99',
    required: true,
  })
  price: number;

  @ApiProperty({
    example: 'Billet normal',
    required: true,
  })
  name: string;
}
