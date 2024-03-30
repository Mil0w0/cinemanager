import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'OSS 117',
    required: true,
  })
  title: string;
  @ApiProperty({
    example: '90',
    required: true,
  })
  duration: number;
  @ApiProperty({
    example: '2024-02-25',
    required: true,
  })
  releaseDate: Date;

  @ApiProperty({
    example: 'Action',
    required: true,
  })
  category: string;
}
