import { IsDate, IsPositive, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  title?: string;

  @IsPositive()
  duration?: number;

  @IsDate()
  releaseDate?: Date;

  @IsString()
  category?: string;
}
