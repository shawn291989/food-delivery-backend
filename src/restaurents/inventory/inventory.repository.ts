import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DishInventory } from '../entities/dish-inventory.entity';

@EntityRepository(DishInventory)
export class InventoryRepository extends Repository<DishInventory> {

  async getDishInventoryByDishId(dishId: string) {
    const inventoryInfo = await this.findOne({
      where: {
        dishId
      }
    });
    if (inventoryInfo) {
      const inventory: number = +inventoryInfo.inventory;
      return inventory;
    }
    throw new NotFoundException('Invalid dish for id, ' + dishId + ' !!!');
  }


  async getInventoryById(dishId: string) {
    const inv = await this.findOne({
      where: {
        dishId
      }
    });
    if (!inv) {
      throw new NotFoundException(
        `No dish item found with id "${dishId}" !!!`,
      );
    }
    return inv;
  }

}
