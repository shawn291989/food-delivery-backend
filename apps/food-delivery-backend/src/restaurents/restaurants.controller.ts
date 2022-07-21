import {
  Controller,
  Post,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { RestaurantDto } from './dto/getRestaurant.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { Restaurant } from './entities/restaurants.entity';
@ApiTags('Restaurants')
@Controller({ path: 'restaurants', version: '1' })
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
  ) { }
  @ApiOkResponse({
    description: 'The Restaurant data has been successfully created.',
    type: Restaurant,
  })
  @Post()
  async createRestaurants(
    @Body() createRestaurantDto: CreateRestaurantDto
  ) {
    const newRestaurant = await this.restaurantService.createRestaurants(
      createRestaurantDto
    )
    return newRestaurant
  }
  @ApiOkResponse({
    description: 'Get List of Restaurants.',
    type: Restaurant,
  })
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
