import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteUserDto {

  @ApiProperty({
    description: 'User ID',
  })
  @IsString()
  userId: string;

}
