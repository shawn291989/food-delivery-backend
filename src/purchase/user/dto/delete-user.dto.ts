import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteUserDto {

  @ApiProperty({
    type: String,
    example: '08ff6a8e-76bd-4f27-850c-b915952d6282',
    description: 'Unique identifier of user.',
  })
  @IsString()
  userId: string;

}
