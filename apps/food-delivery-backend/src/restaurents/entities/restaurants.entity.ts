import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Menu } from '../menu/entities/menu.entity';
import { OpeningHours } from '../opening-hours/entities/openingHours.entity';
import { PaymentHistory } from '../../purchase/entities/paymentHistory.entity';

@Entity()
export class Restaurant {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying' })
  cashBalance: number;


  @Column({ type: 'character varying' })
  restaurantName: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => OpeningHours, (openingHours) => openingHours.restaurant)
  openingHours: OpeningHours[];

  @OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.restaurant)
  paymentHistories: PaymentHistory[];
}
