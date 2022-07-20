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
import { Restaurant } from '../../entities/restaurants.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Menu {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  restaurantId: string;

  @ApiProperty()
  @Column({ type: 'character varying' })
  dishName: string;

  @ApiProperty()
  @Column({ type: 'character varying' })
  price: number;

  @ApiProperty()
  @Column({ type: 'character varying' })
  createdBy: string;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(
    () => Restaurant,
    (Restaurant) => Restaurant.menus,
  )
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;
}
