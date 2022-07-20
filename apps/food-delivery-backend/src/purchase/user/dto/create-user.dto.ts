import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Cash balance of user',
  })
  @IsNumber()
  cashBalance: number;

}
