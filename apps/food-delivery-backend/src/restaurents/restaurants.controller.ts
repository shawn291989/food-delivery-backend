import {
  Controller,
  Post,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { RestaurantDto } from './dto/getRestaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
@ApiTags('restaurants')
@Controller({ path: 'restaurants', version: '1' })
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
  ) { }
  @Post()
  async createRestaurants(
    @Body() createRestaurantDto: CreateRestaurantDto
  ) {
    const newRestaurant = await this.restaurantService.createRestaurants(
      createRestaurantDto
    )
    return newRestaurant
  }
  @Get()
  async getRestaurants(
    @Query() restaurantDto: RestaurantDto
  ) {
    const result = await this.restaurantService.getRestaurants(
      restaurantDto
    )
    return result;
  }

}
