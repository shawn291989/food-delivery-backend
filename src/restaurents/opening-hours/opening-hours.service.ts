import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOpeningHoursDto } from './dto/create-opening-hour.dto';
import { OpeningHoursRepository } from './opening-hours.repository';

@Injectable()
export class OpeningHoursService {
  constructor(
    @InjectRepository(OpeningHoursRepository)
    private openingHoursRepository: OpeningHoursRepository
  ) { }
  async create(restaurantId: string, createOpeningHoursDto: CreateOpeningHoursDto) {
    return await this.openingHoursRepository.createOpeningHours(restaurantId, createOpeningHoursDto);
  }
}