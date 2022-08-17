
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class PurchaseDto {

  @ApiProperty({
    type: String,
    example: 'Mr. xyz',
    description: 'User name/ Customer name!',
  })
  @IsDefined()
  @IsString()
  customerName: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Quantity of order!',
  })
  @IsDefined()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    example: 'Watercress',
    description: 'Name of the dish, which a user wants to purchase',
  })
  @IsDefined()
  @IsString()
  dishName: string;

  @ApiProperty({
    type: String,
    example: 'restaurant',
    description: 'Name of the restaurant, From which a user wants to purchase',
  })
  @IsDefined()
  @IsString()
  restaurantName: string;

  @ApiProperty({
    type: Number,
    example: 10.00,
    description: 'The transection amount',
  })
  @IsDefined()
  @IsNumber()
  transactionAmount: number;

  @Exclude()
  userId: string;

  @Exclude()
  restaurantId: string;
}
