import { IsArray } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { TopRestaurent } from '../entities/top-restaurent.entity';

export class TopRestaurantResponseDto {
  @ApiProperty()
  @IsArray()
  RestaurantName: TopRestaurent[];
}
