import { IsArray, IsDefined, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type as ValidateType } from 'class-transformer';

export class OpeningHoursWithProperties {
  @ApiProperty()
  @IsDefined()
  @IsString({
    message: 'Day of the week!',
  })
  day: string;

  @ApiProperty()
  @IsDefined()
  @IsString({
    message: 'Opening time',
  })
  startTime: string;



  @ApiProperty()
  @IsDefined()
  @IsString({
    message: 'Closing time',
  })
  endTime: string;
}

export class CreateOpeningHoursDto {
  @ApiProperty({ required: true, type: [OpeningHoursWithProperties] })
  @IsDefined()
  @IsArray({
    message: 'There must be an array of Opening hours information!',
  })
  @ValidateNested()
  @ValidateType(() => OpeningHoursWithProperties)
  readonly openingHours?: OpeningHoursWithProperties[];
}
