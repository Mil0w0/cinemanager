import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsDate, IsPositive, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 'Blue Room',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '90',
    required: true,
  })
  @IsPositive()
  maxCapacity: number;

  @ApiProperty({
    example: 'This is a blue room',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'true',
    required: true,
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    example: 'true',
    required: true,
  })
  @IsBoolean()
  hasDisabledAccess: boolean;

    @ApiProperty({
        example: 'IMAX',
        required: true,
    })
  type: string;
}
