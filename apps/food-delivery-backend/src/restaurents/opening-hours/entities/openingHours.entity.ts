import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { OpeningDayEnum } from '../../enum/openingDay.enum';
import { Restaurant } from '../../entities/restaurants.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OpeningHours {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  restaurantId: string;

  @ApiProperty()
  @Column({ type: 'character varying' })
  day: string;

  @ApiProperty()
  @Column({ type: 'character varying' })
  startTime: string;

  @ApiProperty()
  @Column({ type: 'character varying' })
  endTime: string;


  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(
    () => Restaurant,
    (Restaurant) => Restaurant.openingHours,
  )
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;
}
