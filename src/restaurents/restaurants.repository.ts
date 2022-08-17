import { EntityRepository, Repository, getRepository, Like } from 'typeorm';
import * as moment from 'moment'
import { Restaurant } from './entities/restaurants.entity';
import { BadRequestException, HttpCode, HttpStatus, Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { RestaurantDto } from './dto/getRestaurant.dto';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { RestaurantResponseDto } from './dto/getRestaurant-response.dto';
import { MESSAGES } from '@nestjs/core/constants';

@Injectable()
@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {

  async getRestaurants(restaurantDto: RestaurantDto): Promise<RestaurantResponseDto> {
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
      //newRestaturant.id = existingRestaurant.id;
      throw new BadRequestException('Restaurant ' + createRestaurantDto.restaurantName + ' Already Exist, Id: ' + existingRestaurant.id)
    }
    await this.save(newRestaturant);
    return newRestaturant
  }

  async getRetaurantIdByName(restaurantName: string): Promise<string> {
    const restaurant = await this.findOne({
      where:
        `"restaurantName" ILIKE '${restaurantName}'`
    });
    if (restaurant) {
      return restaurant.id;
    }
    throw new NotFoundException('Restaurant name, ' + restaurantName + ', is invalid !!!');
  }


  async getRestaurantById(id: string): Promise<Restaurant> {
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

  async getCashBalanceById(id: string): Promise<number> {
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
