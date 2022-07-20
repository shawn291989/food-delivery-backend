import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {

  @ApiProperty({
    description: 'Cash Balance of a restaurant',
  })
  @IsNumber()
  cashBalance: number;

  @ApiProperty({
    description: 'Name of the restaurant',
  })
  @IsString()
  restaurantName: string;
}
