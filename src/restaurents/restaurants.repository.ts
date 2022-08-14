import { EntityRepository, Repository, getRepository } from 'typeorm';
import * as moment from 'moment'
import { Restaurant } from './entities/restaurants.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantDto } from './dto/getRestaurant.dto';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';

@Injectable()
@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {

  async getRestaurants(restaurantDto: RestaurantDto) {
    const qb = getRepository(Restaurant)
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.openingHours', 'openingHours')
      .leftJoinAndSelect('restaurant.menus', 'menus')
      .select([
        'restaurant.restaurantName'
      ])
    if (restaurantDto.day) {
      qb.where('LOWER(openingHours.day) = :day', {
        day: restaurantDto.day
      })
        .andWhere('openingHours.startTime < :givenTime AND openingHours.endTime > :givenTime', { givenTime: restaurantDto.time })
    }
    if (restaurantDto.qRestaurantName) {
      qb.andWhere('LOWER(restaurant.restaurantName) LiKE :q', {
        q: `%${(restaurantDto.qRestaurantName).toLowerCase()}%`,
      });
    }

    if (restaurantDto.qDishName) {
      qb.andWhere('LOWER(menus.dishName) LiKE :qD', {
        qD: `%${(restaurantDto.qDishName).toLowerCase()}%`,
      });
    }

    qb.orderBy(`restaurant.restaurantName`, 'DESC');


    const restaurants = await qb.getMany();
    const listOfRestaurants = [];

    restaurants.forEach((restaurant) =>
      listOfRestaurants.push(restaurant.restaurantName));

    const result = {
      RestaurantName: listOfRestaurants
    };
    return result;
  }

  async createRestaurants(createRestaurantDto: CreateRestaurantDto)
    : Promise<Restaurant> {
    const newRestaturant = this.create({
      restaurantName: createRestaurantDto.restaurantName,
      cashBalance: createRestaurantDto.cashBalance,
      updated: moment().utc()
    });

    const existingRestaurant = await this.findOne({
      where: {
        restaurantName: createRestaurantDto.restaurantName
      }
    });
    if (existingRestaurant) {
      newRestaturant.id = existingRestaurant.id;
    }
    await this.save(newRestaturant);
    return newRestaturant
  }

  async getRepoIdByRepoName(repoName: string) {
    const restaurant = await this.findOne({
      where: {
        restaurantName: repoName
      }
    });
    if (restaurant) {
      return restaurant.id;
    }
    throw new NotFoundException('Restaurant name, ' + repoName + ', is invalid !!!');
  }


  async getRestaurantById(id: string) {
    const res = await this.findOne({
      where: {
        id
      }
    });
    if (!res) {
      throw new NotFoundException(
        `No restaurant found with id "${id}" !!!`,
      );
    }
    return res;
  }

  async getCashBalanceById(id: string) {
    const restaurantData = await this.findOne({
      where: {
        id
      }
    });
    if (restaurantData) {
      return restaurantData.cashBalance;
    }
    throw new NotFoundException('Restaurant id, ' + id + ', not exists !!!');
  }
}
