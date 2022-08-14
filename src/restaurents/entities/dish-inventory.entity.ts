import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class DishInventory {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying' })
  dishId: string;

  @Column({ type: 'character varying' })
  inventory: number;
}
