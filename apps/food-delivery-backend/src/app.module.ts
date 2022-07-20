import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './config.schema';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { RestaurantModule } from './restaurents/restaurants.module';
import { TopRestaurantModule } from './top-restaurents/top-restaurents.module';
import { PurchaseModule } from './purchase/purchase.module';
import { MenuModule } from './restaurents/menu/menu.module';
import { OpeningHoursModule } from './restaurents/opening-hours/opening-hours.module';
import { UserModule } from './purchase/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({

      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: '1234',
      // database: 'Restaurents',
      // autoLoadEntities: true
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: async (configService: ApiConfigService) =>
        configService.typeOrmConfig,
    }),
    RestaurantModule,
    TopRestaurantModule,
    PurchaseModule,
    MenuModule,
    OpeningHoursModule,
    UserModule
  ],
  controllers: [],
})
export class AppModule { }
