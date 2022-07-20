import {
     PrimaryGeneratedColumn,
     Column,
     Entity,
     ManyToOne,
     JoinColumn,
   } from 'typeorm';
   import { Exclude } from 'class-transformer';
   import { Restaurant } from '../../restaurents/entities/restaurants.entity';
   import { User } from '../user/entities/user.entity';
   
   @Entity()
   export class PaymentHistory {
     @Exclude()
     @PrimaryGeneratedColumn('uuid')
     id: string;
   
     @Column({ type: 'character varying' })
     dishName: string;
   
   
     @Column({ type: 'character varying' })
     restaurantName: string;
   
     @Column({ type: 'character varying' })
     transactionAmount: number;
   
   
     @Column()
     transactionDate: Date;
   
     @Column({ type: 'uuid' })
     userId: string;
   
     @Column({ type: 'uuid' })
     restaurantId: string;
   
     @ManyToOne(
       () => User,
       (User) => User.paymentHistories,
     )
     @JoinColumn({ name: 'userId' })
     user: User;
   
     @ManyToOne(
       () => Restaurant,
       (Restaurant) => Restaurant.paymentHistories,
     )
     @JoinColumn({ name: 'restaurantId' })
     restaurant: Restaurant;
   }
   