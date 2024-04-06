import { ApiProperty } from '@nestjs/swagger';

export class ListAllEntities {
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
}
