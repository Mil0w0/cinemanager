import { IsBoolean, IsDate, IsPositive, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  name?: string;

  @IsPositive()
  maxCapacity?: number;

  @IsString()
  description?: string;

  @IsBoolean()
  isAvailable?: boolean;

  @IsBoolean()
  hasDisabledAccess?: boolean;
}
