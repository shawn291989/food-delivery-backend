import { IsArray } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '../entities/restaurants.entity';

export class RestaurantResponseDto {
  @ApiProperty()
  @IsArray()
  RestaurantName: Restaurant[];
}
