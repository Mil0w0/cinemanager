import { IsDate, IsPositive, IsString } from 'class-validator';

export class UpdateScreeningDto {
  @IsString()
  startingTime?: Date;

  @IsPositive()
  duration?: number;

  @IsDate()
  entries?: number;

  movieID: number;
  roomID: number;
}
