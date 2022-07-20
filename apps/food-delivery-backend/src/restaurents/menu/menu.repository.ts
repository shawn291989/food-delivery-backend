import { EntityRepository, Repository, getConnection, getRepository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import * as moment from 'moment'
import { DishInventory } from '../entities/dish-inventory.entity';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {

  async getDishIdByDishName(dishName: string) {
    const dish = await this.findOne({
      dishName
    });
    if (dish) {
      return dish.id;
    }
    throw new NotFoundException('Dish name, ' + dishName + ', is invalid !!!');

  }
  async createInventory(dishId: string, inventory: number) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(DishInventory)
      .values([
        { dishId, inventory }
      ])
      .execute();
  }

  async getResIdByDishId(dishId: string) {
    const restaurantId = await getConnection()
      .getRepository(Menu)
      .createQueryBuilder('menu')
      .select(['menu.restaurantId'])
      .where('menu.id = :Id', {
        Id: dishId,
      })
      .getRawMany();
    if (restaurantId.length != 0) {
      return restaurantId;
    }
    throw new NotFoundException('The item not availabe in this restaurant !!!');
  }

  async getPriceById(id: string) {
    const dishInfo = await this.findOne({
      id
    });
    if (dishInfo) {
      const dishPrice: number = +dishInfo.price;
      return dishPrice;
    }
    throw new NotFoundException('Dish with id, ' + id + ', not found !!!');
  }

  async createMenu(restaurantId: string, createMenuDto: CreateMenuDto)
    : Promise<any> {
    if (!restaurantId) {
      throw new BadRequestException(
        `Please provide restaurantId in query string`
      );
    }
    const { menus } = createMenuDto;
    const menusCreated = [];
    let menuItem = {};
    for (let i = 0; i < menus.length; i++) {
      const dishName = menus[i]['dishName'];
      const price = menus[i]['price'];
      const inventory = menus[i]['inventory'];
      if (!inventory) {
        throw new BadRequestException(
          `Please provide inventory of the item`
        );
      }
      const newMenu = this.create({
        restaurantId,
        dishName,
        price,
        createdBy: 'shawn',
        updated: moment().utc(),
      });

      const existingMenuItem = await this.findOne({
        restaurantId,
        dishName,
        price,
        createdBy: 'shawn',
      });

      if (existingMenuItem) {
        newMenu.id = existingMenuItem.id;
      }


      await this.save(newMenu);

      if (!existingMenuItem) {
        await this.createInventory(newMenu.id, inventory)
      }

      menuItem = {
        uuid: newMenu.id,
        dishName: newMenu.dishName,
        price: newMenu.price,
        inventory
      };
      menusCreated.push(menuItem);
    }
    return { restaurantId, menus: menusCreated };
  }
}
