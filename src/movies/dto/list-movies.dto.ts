import { ApiProperty } from '@nestjs/swagger';

export class ListAllEntities {
  @ApiProperty({
    example: '10',
    required: true,
  })
  limit: number;
  @ApiProperty({
    example: '1',
    required: true,
  })
  page: number;
}
