import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { RestaurantController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from './restaurants.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantRepository,
      // MenuRepository,
      // InventoryRepository
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule { }
