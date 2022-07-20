
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseDto {

  @ApiProperty({
    description: 'User name/ Customer name!',
  })
  name: string;

  @ApiProperty({
    description: 'Name of the dish, which a user wants to purchase',
  })
  dishName: string;

  @ApiProperty({
    description: 'Name of the restaurant, From which a user wants to purchase',
  })
  restaurantName: string;

  @ApiProperty({
    description: 'The transection amount',
  })
  transactionAmount: number;

  @ApiProperty({
    description: 'Unique identifier of a registered user',
  })
  userId: string;

  @ApiProperty({
    description: 'Unique identifier of a restaurant',
  })
  restaurantId: string;
}
