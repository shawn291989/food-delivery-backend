import { IsArray, IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type as ValidateType } from 'class-transformer';

export class MenusWithProperties {
  @ApiProperty()
  @IsDefined()
  @IsString({
    message: 'Dish name!',
  })
  dishName: string;

  @ApiProperty()
  @IsDefined()
  @IsString({
    message: 'Price of the dish',
  })
  price: number;

  @ApiProperty()
  @IsDefined()
  @IsString({
    message: 'Inventory',
  })
  inventory: number;
}

export class CreateMenuDto {
  @ApiProperty({ required: true, type: [MenusWithProperties] })
  @IsDefined()
  @IsArray({
    message: 'There must be an array of menus!',
  })
  @ValidateNested()
  @ValidateType(() => MenusWithProperties)
  readonly menus?: MenusWithProperties[];
}
