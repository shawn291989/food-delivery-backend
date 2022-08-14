import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantDto } from './dto/getRestaurant.dto';
import { RestaurantRepository } from './restaurants.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { RestaurantResponseDto } from './dto/getRestaurant-response.dto';
import { Restaurant } from './entities/restaurants.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,
  ) { }

  async getRestaurants(
    restaurantDto: RestaurantDto
  ): Promise<RestaurantResponseDto> {
    if (restaurantDto.dateTime) {
      const givenDateTime = new Date(restaurantDto.dateTime);
      const splitedDateTime = this.getDayHourMinute(givenDateTime);

      //assign value
      restaurantDto.day = splitedDateTime.day;
      restaurantDto.time = splitedDateTime.hourNminuite;
    }

    const restaurentData = await this.restaurantRepository.getRestaurants(
      restaurantDto
    );

    if (restaurentData.RestaurantName.length === 0) {
      throw new NotFoundException('No Restaurent found');
    }

    return Promise.resolve(restaurentData)
  }

  async createRestaurants(createRestaurantDto: CreateRestaurantDto):
    Promise<Restaurant> {
    const newRestaurant = await this.restaurantRepository.createRestaurants(
      createRestaurantDto
    );
    return Promise.resolve(newRestaurant)
  }


  //split date and hours:minutes from full dateTime
  getDayHourMinute(dateTimes) {
    const result = {
      day: (dateTimes.toLocaleDateString('en-US', { weekday: 'short' })).toLowerCase(),
      hourNminuite: dateTimes.getHours() + ':' + dateTimes.getMinutes() + ':' + '00',
    }
    return result;
  }
}
