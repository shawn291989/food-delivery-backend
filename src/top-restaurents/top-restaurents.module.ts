import { Module } from '@nestjs/common';
import { TopRestaurantService } from './top-restaurents.service';
import { TopRestaurantController } from './top-restaurents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopRestaurantRepository } from './top-restaurants.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopRestaurantRepository,
    ]),
  ],
  controllers: [TopRestaurantController],
  providers: [TopRestaurantService],
})
export class TopRestaurantModule { }
