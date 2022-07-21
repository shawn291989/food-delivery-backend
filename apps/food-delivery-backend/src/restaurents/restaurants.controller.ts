import {
  Controller,
  Post,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { RestaurantDto } from './dto/getRestaurant.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiRequestTimeoutResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantsDto } from './dto/getRestaurants.dto';
@ApiTags('Restaurants (Create/Get)')
@Controller({ path: 'restaurants', version: '1' })
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
  ) { }
  @ApiCreatedResponse({
    description: 'The Restaurant data has been successfully created.',
    type: Restaurant,
  })
  @ApiOperation({ description: 'This API performs to populate data into database' })
  @ApiBody({ type: CreateRestaurantDto })
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
  @ApiOperation({ description: 'This API will perform two operations, 1. List all restaurants that are open at a certain datetime, To perform this operation only provide dateTime in query, In this case, qRestaurantName & qDishName parameters are optional. 2. Search for restaurants or dishes by name, ranked by relevance to search term. To perform this, Provide, qRestaurantName & qDishName in query, In this case, dateTime parameter is optional' })
  @ApiNotFoundResponse({
    description: 'No Restaurant found !!!'
  })
  @ApiQuery({ type: RestaurantsDto })
  @Get()
  async getRestaurants(
    @Query() restaurantDto: RestaurantsDto
  ) {
    const result = await this.restaurantService.getRestaurants(
      restaurantDto
    )
    return result;
  }

}
