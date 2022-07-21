import { IsDateString, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RestaurantsDto {
  @ApiProperty({
    type: String,
    example: "2022-07-01 12:30:00",
    description: 'Date & Time to check restaurant is open or not',
  })
  @IsOptional()
  @IsDateString()
  dateTime?: string;


  @ApiProperty({
    type: String,
    example: 'restaurant name',
    description: 'Search term for Restaurant name',
  })
  @IsOptional()
  @IsString()
  qRestaurantName?: string;

  @ApiProperty({
    type: String,
    example: 'dish name',
    description: 'Search term for Dishes name',
  })
  @IsOptional()
  @IsString()
  qDishName?: string;
}
