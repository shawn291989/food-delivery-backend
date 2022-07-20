import { EntityRepository, Repository, getConnection, getRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DishInventory } from '../entities/dish-inventory.entity';

@EntityRepository(DishInventory)
export class InventoryRepository extends Repository<DishInventory> {

  async getDishInventoryByDishId(dishId: string) {
    const inventoryInfo = await this.findOne({
      dishId
    });
    if (inventoryInfo) {
      const inventory: number = +inventoryInfo.inventory;
      return inventory;
    }
    throw new NotFoundException('Invalid dish for id, ' + dishId + ' !!!');
  }

  async updateDishInventory(dishId: string, inventory: number)
    : Promise<any> {
    const inventoryValues = await this.getInventoryById(dishId);
    const newInventory = inventory - 1;
    inventoryValues.inventory = newInventory;
    await this.save(inventoryValues);
    const updatedInventory = {
      uuid: inventoryValues.dishId,
      newInventory: inventoryValues.inventory
    };
    return updatedInventory;
  }

  async getInventoryById(dishId: string) {
    const inv = await this.findOne({
      dishId
    });
    if (!inv) {
      throw new NotFoundException(
        `No dish item found with id "${dishId}" !!!`,
      );
    }
    return inv;
  }

}
