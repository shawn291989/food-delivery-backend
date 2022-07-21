import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { OpeningHoursService } from './opening-hours.service';
import { CreateOpeningHoursDto } from './dto/create-opening-hour.dto'

import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpeningHours } from './entities/openingHours.entity';
@ApiTags('Set Schedule/Opening Hours')
@Controller({ path: 'opening-hours', version: '1' })
export class OpeningHoursController {
  constructor(private readonly openingHoursService: OpeningHoursService) { }

  @Post()
  @ApiOperation({ description: 'This API performs to populate Restaurant schedule into database' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateOpeningHoursDto,
  })
  create(
    @Body() createOpeningHoursDto: CreateOpeningHoursDto,
    @Query('restaurantId', ParseUUIDPipe) restaurantId: string,): Promise<OpeningHours> {
    return this.openingHoursService.create(restaurantId, createOpeningHoursDto);
  }
}