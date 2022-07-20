import {
  Controller,
  Post,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { TopRestaurantService } from './top-restaurents.service';
import { TopRestaurantDto } from './dto/top-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('top-restaurants')
@Controller({ path: 'top-restaurants', version: '1' })
export class TopRestaurantController {
  constructor(
    private readonly topRestaurantService: TopRestaurantService,
  ) { }

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
