import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDTO {
  @ApiProperty({
    example: '-100',
    required: true,
  })
  @IsNumber()
  amount: number;
}
