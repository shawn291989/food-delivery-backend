import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    type: String,
    example: 'Shawn',
    description: 'Name of the user',
  })
  @IsDefined()
  @IsString()
  name: string;

  @Exclude()
  @IsNumber()
  @IsOptional()
  spentAmount?: number;

  @ApiProperty({
    type: String,
    example: 'User Address',
    description: 'Address of user',
  })
  @IsDefined()
  @IsString()
  address: string;

}
