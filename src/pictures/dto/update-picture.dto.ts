import { IsBoolean, IsDate, IsPositive, IsString } from 'class-validator';

export class UpdatePictureDto {
  @IsString()
  name?: string;
}
