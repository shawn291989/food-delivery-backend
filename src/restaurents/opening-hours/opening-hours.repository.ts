import { EntityRepository, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { OpeningHours } from './entities/openingHours.entity';
import { CreateOpeningHoursDto } from './dto/create-opening-hour.dto';
import * as moment from 'moment'
import { OpeningHoursResponseDto } from './dto/create-opening-hour-response.dto';

@EntityRepository(OpeningHours)
export class OpeningHoursRepository extends Repository<OpeningHours> {
  async createOpeningHours(restaurantId: string, createOpeningHoursDto: CreateOpeningHoursDto): Promise<OpeningHoursResponseDto> {
    if (!restaurantId) {
      throw new BadRequestException(
        `Please provide restaurantId in query string`
      );
    }
    const { openingHours } = createOpeningHoursDto;
    const openingHoursCreated = [];
    let openingHoursList = {};
    for (let i = 0; i < openingHours.length; i++) {
      const day = openingHours[i]['day'];
      const startTime = openingHours[i]['startTime'];
      const endTime = openingHours[i]['endTime'];
      if (startTime.length === 8 && endTime.length === 8) {
        const newOpeningHours = this.create({
          restaurantId,
          day,
          startTime,
          endTime,
          updated: moment().utc(),
        });
        const existingopeningHours = await this.findOne({
          where: {
            restaurantId,
            day,
            startTime,
            endTime
          }
        });
        if (existingopeningHours) {
          newOpeningHours.id = existingopeningHours.id;
        }
        await this.save(newOpeningHours);
        openingHoursList = {
          uuid: newOpeningHours.id,
          day: newOpeningHours.day,
          startTime: newOpeningHours.startTime,
          endTime: newOpeningHours.endTime,
        };
        openingHoursCreated.push(openingHoursList);

      } else {
        throw new BadRequestException(
          `Please provide time in HH:MM:SS format`
        );
      }
    }
    return { restaurantId, openingHours: openingHoursCreated };
  }
}
