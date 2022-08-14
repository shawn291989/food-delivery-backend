import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

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
    description: 'Cash balance of user',
  })
  @IsNumber()
  newBalance: number;

}
