import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRepository } from './purchase.repository';
import { UserRepository } from './user/user.repository';
import { RestaurantRepository } from '../restaurents/restaurants.repository';
import { MenuRepository } from '../restaurents/menu/menu.repository';
import { InventoryRepository } from '../restaurents/inventory/inventory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseRepository,
      UserRepository,
      RestaurantRepository,
      MenuRepository,
      InventoryRepository
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }
