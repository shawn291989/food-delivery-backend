import { Module } from '@nestjs/common';
import { OpeningHoursService } from './opening-hours.service';
import { OpeningHoursController } from './opening-hours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningHoursRepository } from './opening-hours.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OpeningHoursRepository
    ]),
  ],
  controllers: [OpeningHoursController],
  providers: [OpeningHoursService]
})
export class OpeningHoursModule { }
