import { ApiProperty } from '@nestjs/swagger';

import { IsDate, IsPositive, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'OSS 117',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '90',
    required: true,
  })
  @IsPositive()
  duration: number;

  @ApiProperty({
    example: '2024-02-25',
    required: true,
  })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    example: 'Action',
    required: true,
  })
  @IsString()
  category: string;
}
