import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

import { ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';
@ApiTags('Create Menu')
@Controller({ path: 'menu', version: '1' })
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @ApiOperation({ description: 'This API performs to populate menu information into Database' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateMenuDto,
  })
  @ApiBody({ type: CreateMenuDto })
  create(
    @Body() createMenuDto: {},
    @Query('restaurantId', ParseUUIDPipe) restaurantId: string,): Promise<Menu> {
    return this.menuService.create(restaurantId, createMenuDto);
  }
}
