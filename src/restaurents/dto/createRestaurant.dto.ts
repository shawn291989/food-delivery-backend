import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {

  @ApiProperty({
    type: Number,
    example: 20,
    description: 'Cash Balance of a restaurant',
  })
  @IsNumber()
  cashBalance: number;

  @ApiProperty({
    type: String,
    example: 'restaurant name',
    description: 'Name of the restaurant',
  })
  @IsString()
  restaurantName: string;
}
