import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class TopRestaurantDto {

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'A restaurent having more number of disher',
  })

  dishesHaveMoreThan: number;

  @ApiProperty({
    type: Number,
    example: 20,
    description: 'A restaurent having less number of dishes',
  })
  dishesHaveLessThan: number;

  @ApiProperty({
    type: Number,
    example: 300,
    description: 'Top price of dishes in a range',
  })
  topPrice: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Lower price of dishes in a range',
  })
  lowerPrice: number;

}
