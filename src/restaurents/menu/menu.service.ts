import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuRepository)
    private menuRepository: MenuRepository
  ) { }
  async create(restaurantId: string, createMenuDto: CreateMenuDto) {
    return await this.menuRepository.createMenu(restaurantId, createMenuDto);
  }
}
