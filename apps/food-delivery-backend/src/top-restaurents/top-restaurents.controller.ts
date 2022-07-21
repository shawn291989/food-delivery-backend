import {
  Controller,
  Post,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { TopRestaurantService } from './top-restaurents.service';
import { TopRestaurantDto } from './dto/top-restaurant.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('TOP-restaurants')
@Controller({ path: 'top-restaurants', version: '1' })
export class TopRestaurantController {
  constructor(
    private readonly topRestaurantService: TopRestaurantService,
  ) { }
  @ApiOkResponse({
    description: 'List of Top Restaurants.',
    type: TopRestaurantDto,
  })
  @ApiOperation({ description: 'This API performs to List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically. More or less (than x) is a parameter that the API allows the consumer to enter' })
  @ApiNotFoundResponse({
    description: 'No Restaurant found !!!'
  })
  // @ApiQuery({ type: TopRestaurantDto })
  @Get()
  async getTopRestaurants(
    @Query() topRestaurantDto: TopRestaurantDto,
  ) {
    const result = await this.topRestaurantService.getTopRestaurant(
      topRestaurantDto
    );

    return result;
  }
}
