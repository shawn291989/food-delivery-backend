
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {

  @ApiProperty({
    type: String,
    example: 'Mr. xyz',
    description: 'User name/ Customer name!',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Watercress',
    description: 'Name of the dish, which a user wants to purchase',
  })
  dishName: string;

  @ApiProperty({
    type: String,
    example: 'restaurant',
    description: 'Name of the restaurant, From which a user wants to purchase',
  })
  restaurantName: string;

  @ApiProperty({
    type: Number,
    example: 10.00,
    description: 'The transection amount',
  })
  transactionAmount: number;
}
