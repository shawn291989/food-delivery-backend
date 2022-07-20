import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { OpeningHoursService } from './opening-hours.service';
import { CreateOpeningHoursDto } from './dto/create-opening-hour.dto'

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OpeningHours } from './entities/openingHours.entity';
@ApiTags('opening-hours')
@Controller({ path: 'opening-hours', version: '1' })
export class OpeningHoursController {
  constructor(private readonly openingHoursService: OpeningHoursService) { }

  @Post()
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