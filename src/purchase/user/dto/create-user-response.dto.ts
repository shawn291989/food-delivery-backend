import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateUserResponseDto {

  @ApiProperty({
    type: String,
    example: 'uuid',
    description: 'Unique identifire of a User',
  })
  @IsUUID()
  uuid: string;

  @ApiProperty({
    type: Number,
    example: 3500,
    description: 'Total spent amount of user',
  })
  @IsNumber()
  totalSpentAmount: number;

  @ApiProperty({
    type: String,
    example: 'User Address',
    description: 'Address of user',
  })
  @IsString()
  address: string;
}
