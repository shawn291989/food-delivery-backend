import { Controller, Post, Body, Query, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { OpeningHoursService } from './opening-hours.service';
import { CreateOpeningHoursDto } from './dto/create-opening-hour.dto'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpeningHoursResponseDto } from './dto/create-opening-hour-response.dto';
@ApiTags('Set Schedule/Opening Hours')
@Controller({ path: 'opening-hours', version: '1' })
export class OpeningHoursController {
  constructor(private readonly openingHoursService: OpeningHoursService) { }

  @Post()
  @ApiOperation({ description: 'This API performs to populate Restaurant schedule into database' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: OpeningHoursResponseDto,
  })
  async create(
    @Body() createOpeningHoursDto: CreateOpeningHoursDto,
    @Query('restaurantId', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) restaurantId: string,): Promise<OpeningHoursResponseDto> {
    return await this.openingHoursService.create(restaurantId, createOpeningHoursDto);
  }
}