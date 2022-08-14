
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseResponseDto {

  @ApiProperty({
    type: String,
    example: 'Mr. xyz',
    description: 'User name/ Customer name!',
  })
  userName: string;

  @ApiProperty({
    type: String,
    example: 'Watercress',
    description: 'Name of the dish, which a user wants to purchase',
  })
  dishName: string;

  @ApiProperty({
    type: Number,
    example: 12,
    description: 'Availabe inventory',
  })
  availabeInventory: number;

  @ApiProperty({
    type: String,
    example: 'Example name',
    description: 'Name of the Restaurant',
  })
  restaurantName: string;


  @ApiProperty({
    type: Number,
    example: 10.00,
    description: 'The transection amount',
  })
  transactionAmount: number;

  @ApiProperty({
    type: Number,
    example: 100.00,
    description: 'Restaurant cash balance',
  })
  restaurantCashBalance: number;


  @ApiProperty({
    type: Date,
    example: "2022-08-14T12:21:27.612Z",
    description: 'Date of transection',
  })
  transactionDate: Date;
}
