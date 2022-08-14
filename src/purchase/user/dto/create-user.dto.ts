import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    type: String,
    example: 'Shawn',
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    example: 3500,
    description: 'Cash balance of user',
  })
  @IsNumber()
  cashBalance: number;

}
