import { EntityRepository, Repository, getConnection, getRepository } from 'typeorm';

import { Restaurant } from '../restaurents/entities/restaurants.entity';
import { NotFoundException } from '@nestjs/common';
import { TopRestaurantDto } from './dto/top-restaurant.dto';

@EntityRepository(Restaurant)
export class TopRestaurantRepository extends Repository<Restaurant> {

  async getTopRestaurants(restaurantDto: TopRestaurantDto) {
    const qb = getRepository(Restaurant)
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.menus', 'menus')
      .select([
        'restaurant.restaurantName'
      ])
      .addSelect('COUNT(menus.id)', 'dishCount')
      .where('menus.price < :topPrice', { topPrice: restaurantDto.topPrice })
      .andWhere('menus.price > :lowPrice', { lowPrice: restaurantDto.lowerPrice })
    qb.groupBy(`restaurant.restaurantName`)
    qb.orderBy(`restaurant.restaurantName`, 'DESC');

    const restaurants = await qb.getRawMany();

    const listOfRestaurants = [];
    let dishCount = 0;
    for (let i = 0; i < restaurants.length; i++) {
      listOfRestaurants.push(restaurants[i].restaurant_restaurantName);
      const singleDishCount: number = +restaurants[i].dishCount;
      dishCount = singleDishCount + dishCount;
    }
    if (dishCount >= restaurantDto.dishesHaveMoreThan && dishCount <= restaurantDto.dishesHaveLessThan) {
      const result = {
        RestaurantName: listOfRestaurants
      };
      return result;
    }
    throw new NotFoundException('No Restaurent is found !!!');
  }
}
