import {
     PrimaryGeneratedColumn,
     Column,
     UpdateDateColumn,
     DeleteDateColumn,
     Entity,
     OneToMany,
   } from 'typeorm';
   import { Exclude } from 'class-transformer';
   import { PaymentHistory } from '../../entities/paymentHistory.entity';
   
   @Entity()
   export class User {
     @Exclude()
     @PrimaryGeneratedColumn('uuid')
     id: string;
   
     @Column({ type: 'character varying' })
     name: string;
   
   
     @Column({ type: 'character varying' })
     cashBalance: number;
   
   
     @UpdateDateColumn()
     updated!: Date;
   
     @DeleteDateColumn()
     deletedAt?: Date;
   
     @OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.user)
     paymentHistories: PaymentHistory[];
   }
   