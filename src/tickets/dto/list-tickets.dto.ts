import { ApiProperty } from '@nestjs/swagger';

export class ListTicketsDto {
  @ApiProperty({
    example: '3',
    required: false,
  })
  limit?: number;
  @ApiProperty({
    example: '1',
    required: false,
  })
  page?: number;

  @ApiProperty({
    example: '1',
    required: false,
  })
  userID: number;
}
