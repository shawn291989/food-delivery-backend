import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantRepository } from '../restaurants.repository';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuRepository)
    private readonly menuRepository: MenuRepository,
    @InjectRepository(RestaurantRepository)
    private readonly restaurantRepository: RestaurantRepository
  ) { }
  async create(restaurantId: string, createMenuDto: CreateMenuDto): Promise<Menu> {
    await this.restaurantRepository.getRestaurantById(restaurantId)
    return await this.menuRepository.createMenu(restaurantId, createMenuDto);
  }
}
