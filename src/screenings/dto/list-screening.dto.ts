import { ApiProperty } from '@nestjs/swagger';

export class ListScreeningParams {
  @ApiProperty({
    example: '10',
    required: false,
  })
  limit?: number = 10;
  @ApiProperty({
    example: '1',
    required: false,
  })
  page?: number = 1;
  @ApiProperty({
    example: '1',
    required: false,
  })
  movieID?: number = 1;
  @ApiProperty({
    example: '1',
    required: false,
  })
  roomID?: number = 1;

  @ApiProperty({
    example: '2024-06-12 12:00:02',
    required: false,
  })
  from?: Date;

  @ApiProperty({
    example: '2024-06-12 12:00:02',
    required: false,
  })
  to?: Date;
}
