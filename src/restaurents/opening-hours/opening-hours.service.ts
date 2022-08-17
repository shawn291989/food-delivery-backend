import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantRepository } from '../restaurants.repository';
import { OpeningHoursResponseDto } from './dto/create-opening-hour-response.dto';
import { CreateOpeningHoursDto } from './dto/create-opening-hour.dto';
import { OpeningHoursRepository } from './opening-hours.repository';

@Injectable()
export class OpeningHoursService {
  constructor(
    @InjectRepository(OpeningHoursRepository)
    private readonly openingHoursRepository: OpeningHoursRepository,
    @InjectRepository(RestaurantRepository)
    private readonly restaurantRepository: RestaurantRepository
  ) { }
  async create(restaurantId: string, createOpeningHoursDto: CreateOpeningHoursDto): Promise<OpeningHoursResponseDto> {
    await this.restaurantRepository.getRestaurantById(restaurantId)
    return await this.openingHoursRepository.createOpeningHours(restaurantId, createOpeningHoursDto);
  }
}