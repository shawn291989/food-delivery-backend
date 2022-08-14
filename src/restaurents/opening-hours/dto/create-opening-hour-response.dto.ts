import { IsArray, IsDefined, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type as ValidateType } from 'class-transformer';

export class OpeningHoursResponseDto {
  @IsUUID()
  restaurantId: string;

  @IsDefined()
  openingHours: {};
}
