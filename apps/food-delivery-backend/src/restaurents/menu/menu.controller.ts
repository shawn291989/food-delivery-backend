import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';
@ApiTags('menu')
@Controller({ path: 'menu', version: '1' })
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateMenuDto,
  })
  create(
    @Body() createMenuDto: any,
    @Query('restaurantId', ParseUUIDPipe) restaurantId: string,): Promise<Menu> {
    return this.menuService.create(restaurantId, createMenuDto);
  }
}
