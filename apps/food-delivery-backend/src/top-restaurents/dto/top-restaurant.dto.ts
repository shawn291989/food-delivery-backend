import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class TopRestaurantDto {

  @ApiProperty({
    description: 'A restaurent having more number of disher',
  })
  dishesHaveMoreThan: number;

  @ApiProperty({
    description: 'A restaurent having less number of dishes',
  })
  dishesHaveLessThan: number;

  @ApiProperty({
    description: 'Top price of dishes in a range',
  })
  topPrice: number;

  @ApiProperty({
    description: 'Lower price of dishes in a range',
  })

  lowerPrice: number;

}
