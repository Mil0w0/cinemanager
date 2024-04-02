import { IsDate, IsPositive, IsString } from 'class-validator';

export class UpdateScreeningDto {
  @IsString()
  startingDate?: Date;

  @IsPositive()
  duration?: number;

  @IsDate()
  entries?: number;
}
