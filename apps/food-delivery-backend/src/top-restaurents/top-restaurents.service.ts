import { Injectable } from '@nestjs/common';
import { TopRestaurantDto } from './dto/top-restaurant.dto';
import { TopRestaurantRepository } from './top-restaurants.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TopRestaurantService {
  constructor(
    @InjectRepository(TopRestaurantRepository)
    private topRestaurantRepository: TopRestaurantRepository,
  ) { }

  async getTopRestaurant(restaurantDto: TopRestaurantDto) {
    const topRestaurentData = await this.topRestaurantRepository.getTopRestaurants(restaurantDto);
    return topRestaurentData
  }
}
